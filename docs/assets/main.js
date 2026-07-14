/* Kayden Clark - portfolio
   Progressive enhancement only: every feature here has a working no-JS fallback.
   - Interactive diagrams (hover/focus a node -> caption explains it; keyboard accessible)
*/
(function () {
  "use strict";

  var root = document.documentElement;
  var themeStorageKey = "theme";
  var explicitTheme = null;

  function systemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  try {
    explicitTheme = localStorage.getItem("theme");
  } catch (_error) {
    explicitTheme = null;
  }

  if (explicitTheme === "light" || explicitTheme === "dark") {
    root.setAttribute("data-theme", explicitTheme);
  } else {
    root.setAttribute("data-theme", systemTheme());
  }

  document.addEventListener("DOMContentLoaded", function () {
    /* ---------- light/dark theme ---------- */
    var themeToggle = document.getElementById("theme-toggle");
    var themeMedia = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

    function syncThemeControl() {
      if (!themeToggle) return;
      var current = root.getAttribute("data-theme") || systemTheme();
      var next = current === "dark" ? "light" : "dark";
      var label = themeToggle.querySelector(".theme-toggle-text");
      themeToggle.setAttribute("aria-label", "Switch to " + next + " theme");
      themeToggle.setAttribute("aria-pressed", String(current === "dark"));
      if (label) label.textContent = next.charAt(0).toUpperCase() + next.slice(1);
    }

    if (themeToggle) {
      syncThemeControl();
      themeToggle.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        explicitTheme = next;
        try {
          localStorage.setItem(themeStorageKey, next);
        } catch (_error) {
          // The visual control still works when storage is unavailable.
        }
        syncThemeControl();
      });
    }

    if (themeMedia && typeof themeMedia.addEventListener === "function") {
      themeMedia.addEventListener("change", function () {
        if (explicitTheme) return;
        root.setAttribute("data-theme", systemTheme());
        syncThemeControl();
      });
    }

    /* ---------- interactive diagrams ---------- */
    // Each diagram: <figure class="diagram"> containing .dg-node[data-info] elements
    // and a .diagram-caption. Hover or focus a node -> caption swaps to its explanation.
    // Misuse cases handled: no JS (static caption stays), touch (tap = focus),
    // keyboard (tabindex + Enter/Escape), screen reader (aria-describedby not needed:
    // caption is aria-live).
    document.querySelectorAll("figure.diagram").forEach(function (fig) {
      var caption = fig.querySelector(".diagram-caption");
      if (!caption) return;
      var defaultHTML = caption.innerHTML;
      caption.setAttribute("aria-live", "polite");

      fig.querySelectorAll(".dg-node").forEach(function (node) {
        node.setAttribute("tabindex", "0");
        node.setAttribute("role", "button");

        function show() {
          fig.querySelectorAll(".dg-node.active").forEach(function (n) { n.classList.remove("active"); });
          node.classList.add("active");
          var title = node.getAttribute("data-title") || "";
          var info = node.getAttribute("data-info") || "";
          caption.innerHTML = "<strong>" + title + "</strong> — " + info;
        }
        function reset() {
          node.classList.remove("active");
          caption.innerHTML = defaultHTML;
        }

        node.addEventListener("mouseenter", show);
        node.addEventListener("mouseleave", reset);
        node.addEventListener("focus", show);
        node.addEventListener("blur", reset);
        node.addEventListener("keydown", function (ev) {
          if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); show(); }
          if (ev.key === "Escape") { reset(); node.blur(); }
        });
      });
    });
  });
})();
