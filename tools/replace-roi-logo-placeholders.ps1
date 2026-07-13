[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$DeckPath
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem

function Get-EntryText {
  param([System.IO.Compression.ZipArchiveEntry]$Entry)

  $reader = [System.IO.StreamReader]::new($Entry.Open())
  try {
    return $reader.ReadToEnd()
  }
  finally {
    $reader.Dispose()
  }
}

function Write-EntryText {
  param(
    [System.IO.Compression.ZipArchive]$Archive,
    [string]$Name,
    [string]$Content
  )

  $entry = $Archive.CreateEntry($Name, [System.IO.Compression.CompressionLevel]::Optimal)
  $writer = [System.IO.StreamWriter]::new($entry.Open(), [System.Text.UTF8Encoding]::new($false))
  try {
    $writer.Write($Content)
  }
  finally {
    $writer.Dispose()
  }
}

function ConvertTo-LogoPlaceholderShape {
  param([string]$PictureXml)

  $id = [regex]::Match($PictureXml, '<p:cNvPr id="(\d+)"').Groups[1].Value
  $xfrm = [regex]::Match($PictureXml, '<a:xfrm>[\s\S]*?</a:xfrm>').Value
  if ([string]::IsNullOrWhiteSpace($id) -or [string]::IsNullOrWhiteSpace($xfrm)) {
    throw 'A logo picture was missing its shape ID or position.'
  }

  return @"
<p:sp><p:nvSpPr><p:cNvPr id="$id" name="Logo Placeholder" descr="Unbranded logo placement placeholder"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr>$xfrm<a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:solidFill><a:srgbClr val="F8FAFC"/></a:solidFill><a:ln w="12700"><a:solidFill><a:srgbClr val="94A3B8"/></a:solidFill></a:ln></p:spPr><p:txBody><a:bodyPr anchor="ctr" lIns="91440" tIns="45720" rIns="91440" bIns="45720"/><a:lstStyle/><a:p><a:pPr algn="ctr"/><a:r><a:rPr lang="en-US" sz="900" b="1"><a:solidFill><a:srgbClr val="475569"/></a:solidFill><a:latin typeface="Aptos"/></a:rPr><a:t>LOGO PLACEHOLDER</a:t></a:r><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp>
"@
}

$resolvedDeckPath = (Resolve-Path -LiteralPath $DeckPath).Path
$source = [System.IO.Compression.ZipFile]::OpenRead($resolvedDeckPath)
$replacementPath = "$resolvedDeckPath.replace"
$removedEntries = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::Ordinal)
$removedRelationships = 0
$replacedShapes = 0

try {
  $requiredEntries = @('ppt/media/image1.png', 'ppt/media/image2.png', 'docProps/thumbnail.jpeg')
  foreach ($requiredEntry in $requiredEntries) {
    if (-not $source.GetEntry($requiredEntry)) {
      throw "Expected ROI asset '$requiredEntry' was not found."
    }
  }

  $logoRelationshipIds = @{}
  foreach ($relationshipEntry in $source.Entries | Where-Object { $_.FullName -match '^ppt/slides/_rels/slide\d+\.xml\.rels$' }) {
    $relationshipXml = Get-EntryText $relationshipEntry
    $ids = [regex]::Matches($relationshipXml, '<Relationship Id="([^"]+)"[^>]+Target="\.\./media/image[12]\.png"[^>]*/>') |
      ForEach-Object { $_.Groups[1].Value }
    if ($ids.Count -gt 0) {
      $slideName = ($relationshipEntry.FullName -replace '^ppt/slides/_rels/', '' -replace '\.rels$', '')
      $logoRelationshipIds[$slideName] = @($ids)
    }
  }

  if ($logoRelationshipIds.Count -eq 0) {
    throw 'No ROI image relationships were found in the deck.'
  }

  $replacement = [System.IO.Compression.ZipFile]::Open($replacementPath, [System.IO.Compression.ZipArchiveMode]::Create)
  try {
    foreach ($entry in $source.Entries) {
      $name = $entry.FullName
      if ($name -in @('ppt/media/image1.png', 'ppt/media/image2.png', 'docProps/thumbnail.jpeg')) {
        [void]$removedEntries.Add($name)
        continue
      }

      if ($name -eq '_rels/.rels') {
        $content = Get-EntryText $entry
        $content = [regex]::Replace($content, '<Relationship Id="[^"]+" Type="http://schemas\.openxmlformats\.org/package/2006/relationships/metadata/thumbnail" Target="docProps/thumbnail\.jpeg"/>', '')
        Write-EntryText $replacement $name $content
        continue
      }

      if ($name -match '^ppt/slides/_rels/slide\d+\.xml\.rels$') {
        $content = Get-EntryText $entry
        $before = $content
        $content = [regex]::Replace($content, '<Relationship Id="[^"]+" Type="http://schemas\.openxmlformats\.org/officeDocument/2006/relationships/image" Target="\.\./media/image[12]\.png"/>', '')
        $removedRelationships += ([regex]::Matches($before, '<Relationship Id="[^"]+" Type="http://schemas\.openxmlformats\.org/officeDocument/2006/relationships/image" Target="\.\./media/image[12]\.png"/>').Count)
        Write-EntryText $replacement $name $content
        continue
      }

      if ($name -match '^ppt/slides/slide\d+\.xml$' -and $logoRelationshipIds.ContainsKey($name.Substring(11))) {
        $content = Get-EntryText $entry
        $ids = $logoRelationshipIds[$name.Substring(11)]
        $evaluator = [System.Text.RegularExpressions.MatchEvaluator]{
          param($match)
          foreach ($relationshipId in $ids) {
            if ($match.Value -match ('r:embed="' + [regex]::Escape($relationshipId) + '"')) {
              $script:replacedShapes++
              return ConvertTo-LogoPlaceholderShape $match.Value
            }
          }
          return $match.Value
        }
        $content = [regex]::Replace($content, '<p:pic>[\s\S]*?</p:pic>', $evaluator)
        Write-EntryText $replacement $name $content
        continue
      }

      $target = $replacement.CreateEntry($name, [System.IO.Compression.CompressionLevel]::Optimal)
      $input = $entry.Open()
      $output = $target.Open()
      try {
        $input.CopyTo($output)
      }
      finally {
        $output.Dispose()
        $input.Dispose()
      }
    }
  }
  finally {
    $replacement.Dispose()
  }
}
finally {
  $source.Dispose()
}

if ($removedEntries.Count -ne 3 -or $removedRelationships -ne 6 -or $replacedShapes -ne 9) {
  Remove-Item -LiteralPath $replacementPath -Force -ErrorAction SilentlyContinue
  throw "Validation failed before replacing the deck. Removed entries: $($removedEntries.Count); relationships: $removedRelationships; placeholders: $replacedShapes."
}

$check = [System.IO.Compression.ZipFile]::OpenRead($replacementPath)
try {
  foreach ($forbiddenEntry in @('ppt/media/image1.png', 'ppt/media/image2.png', 'docProps/thumbnail.jpeg')) {
    if ($check.GetEntry($forbiddenEntry)) {
      throw "Replacement deck still contains '$forbiddenEntry'."
    }
  }

  $placeholderCount = 0
  foreach ($entry in $check.Entries | Where-Object { $_.FullName -match '^ppt/slides/slide\d+\.xml$' }) {
    $placeholderCount += ([regex]::Matches((Get-EntryText $entry), 'LOGO PLACEHOLDER').Count)
  }
  if ($placeholderCount -ne 9) {
    throw "Replacement deck has $placeholderCount logo placeholders; expected 9."
  }
}
finally {
  $check.Dispose()
}

[System.IO.File]::Copy($replacementPath, $resolvedDeckPath, $true)
Remove-Item -LiteralPath $replacementPath -Force
Write-Output "Replaced 9 ROI logo placements with logo placeholders and removed the embedded ROI assets."
