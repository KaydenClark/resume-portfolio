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
  try { return $reader.ReadToEnd() }
  finally { $reader.Dispose() }
}

function Write-EntryText {
  param(
    [System.IO.Compression.ZipArchive]$Archive,
    [string]$Name,
    [string]$Content
  )

  $entry = $Archive.CreateEntry($Name, [System.IO.Compression.CompressionLevel]::Optimal)
  $writer = [System.IO.StreamWriter]::new($entry.Open(), [System.Text.UTF8Encoding]::new($false))
  try { $writer.Write($Content) }
  finally { $writer.Dispose() }
}

$copyrightPattern = 'Copyright[^<]+'
$resolvedDeckPath = (Resolve-Path -LiteralPath $DeckPath).Path
$replacementPath = "$resolvedDeckPath.replace"
if (Test-Path -LiteralPath $replacementPath) {
  Remove-Item -LiteralPath $replacementPath -Force
}

$source = [System.IO.Compression.ZipFile]::OpenRead($resolvedDeckPath)
$removed = 0
try {
  $replacement = [System.IO.Compression.ZipFile]::Open($replacementPath, [System.IO.Compression.ZipArchiveMode]::Create)
  try {
    foreach ($entry in $source.Entries) {
      if ($entry.FullName -match '^ppt/slides/slide\d+\.xml$') {
        $content = Get-EntryText $entry
        $matches = [regex]::Matches($content, $copyrightPattern).Count
        $removed += $matches
        $content = [regex]::Replace($content, $copyrightPattern, '')
        Write-EntryText $replacement $entry.FullName $content
        continue
      }

      $target = $replacement.CreateEntry($entry.FullName, [System.IO.Compression.CompressionLevel]::Optimal)
      $input = $entry.Open()
      $output = $target.Open()
      try { $input.CopyTo($output) }
      finally {
        $output.Dispose()
        $input.Dispose()
      }
    }
  }
  finally { $replacement.Dispose() }
}
finally { $source.Dispose() }

if ($removed -ne 5) {
  Remove-Item -LiteralPath $replacementPath -Force -ErrorAction SilentlyContinue
  throw "Expected five deck copyright notices; found $removed."
}

$check = [System.IO.Compression.ZipFile]::OpenRead($replacementPath)
try {
  $remaining = 0
  foreach ($entry in $check.Entries | Where-Object { $_.FullName -match '^ppt/slides/slide\d+\.xml$' }) {
    $remaining += [regex]::Matches((Get-EntryText $entry), $copyrightPattern).Count
  }
  if ($remaining -ne 0) {
    throw "Replacement deck still contains $remaining copyright notices."
  }
}
finally { $check.Dispose() }

[System.IO.File]::Copy($replacementPath, $resolvedDeckPath, $true)
Remove-Item -LiteralPath $replacementPath -Force
Write-Output 'Removed five copyright notices from the deck footer.'
