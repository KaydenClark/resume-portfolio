/* Kayden Clark - portfolio
   Progressive enhancement only: every feature here has a working no-JS fallback.
   - Interactive diagrams (hover/focus a node -> caption explains it; keyboard accessible)
*/
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
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
