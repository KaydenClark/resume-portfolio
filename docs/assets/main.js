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

    /* ---------- interactive metrics roll-up ---------- */
    // Rebuilds the Excel roll-up as a live grid. No-JS fallback: the static
    // table already in the page stays untouched if this never runs.
    initRollups();
  });

  function addCommas(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function toDuration(seconds) {
    var s = Math.round(seconds);
    var m = Math.floor(s / 60);
    var r = s % 60;
    return m + ":" + (r < 10 ? "0" + r : r);
  }
  function formatValue(meta, val) {
    if (meta.format === "int") return addCommas(val);
    if (meta.format === "pct") return Math.round(val) + "%";
    if (meta.format === "pct1") return val.toFixed(1) + "%";
    if (meta.format === "duration") return toDuration(val);
    return String(val);
  }
  function formatDelta(meta, delta) {
    var sign = delta > 0 ? "+" : delta < 0 ? "-" : "";
    var mag = Math.abs(delta);
    var body;
    if (meta.format === "int") body = addCommas(mag);
    else if (meta.format === "duration") body = toDuration(mag);
    else if (meta.format === "pct1") body = mag.toFixed(1) + "%";
    else if (meta.format === "pct") body = Math.round(mag) + "%";
    else body = String(mag);
    return sign + body;
  }

  function initRollups() {
    var data = window.KC_PORTFOLIO;
    if (!data || !data.accounts || !data.accounts.length) return; // static fallback stands

    document.querySelectorAll("[data-rollup]").forEach(function (root) {
      var controls = root.querySelector("[data-rollup-controls]");
      var grid = root.querySelector("[data-rollup-grid]");
      var status = root.querySelector("[data-rollup-status]");
      if (!controls || !grid) return;

      var state = { accountId: data.accounts[0].id, granularity: "week", start: 0 };

      function account() {
        return data.accounts.filter(function (a) { return a.id === state.accountId; })[0] || data.accounts[0];
      }
      function labels() {
        return state.granularity === "week" ? data.weekLabels : data.monthLabels;
      }
      // Weekly series, or 4-week rolled-up periods (sum for counts, volume-weighted mean for rates).
      function seriesFor(acct, meta) {
        var weekly = meta.key === "volume" ? acct.metrics.volume : acct.metrics[meta.key];
        if (state.granularity === "week") return weekly.slice();
        var weights = acct.metrics.volume;
        var per = data.weeksPerMonth;
        var out = [];
        for (var i = 0; i < weekly.length; i += per) {
          var vs = weekly.slice(i, i + per);
          var ws = weights.slice(i, i + per);
          if (meta.agg === "sum") {
            out.push(vs.reduce(function (s, v) { return s + v; }, 0));
          } else {
            var num = 0, den = 0;
            for (var j = 0; j < vs.length; j++) { num += vs[j] * ws[j]; den += ws[j]; }
            out.push(den ? num / den : 0);
          }
        }
        return out;
      }

      // ----- controls -----
      var accWrap = document.createElement("label");
      accWrap.className = "rollup-field";
      accWrap.appendChild(document.createTextNode("Account"));
      var accSel = document.createElement("select");
      data.accounts.forEach(function (a) {
        var opt = document.createElement("option");
        opt.value = a.id;
        opt.textContent = a.name + " — " + a.vertical;
        accSel.appendChild(opt);
      });
      accSel.value = state.accountId;
      accSel.addEventListener("change", function () {
        state.accountId = accSel.value;
        render();
      });
      accWrap.appendChild(accSel);

      var granGroup = document.createElement("div");
      granGroup.className = "rollup-seg";
      granGroup.setAttribute("role", "group");
      granGroup.setAttribute("aria-label", "Granularity");
      var granButtons = {};
      [["week", "Weekly"], ["month", "Monthly"]].forEach(function (pair) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = pair[1];
        btn.addEventListener("click", function () {
          if (state.granularity === pair[0]) return;
          state.granularity = pair[0];
          state.start = 0;
          buildStartOptions();
          render();
        });
        granGroup.appendChild(btn);
        granButtons[pair[0]] = btn;
      });

      var startWrap = document.createElement("label");
      startWrap.className = "rollup-field";
      startWrap.appendChild(document.createTextNode("Start period"));
      var startSel = document.createElement("select");
      startSel.addEventListener("change", function () {
        state.start = Number(startSel.value);
        render();
      });
      startWrap.appendChild(startSel);

      function buildStartOptions() {
        var ls = labels();
        startSel.innerHTML = "";
        // Keep at least two visible columns.
        for (var i = 0; i <= ls.length - 2; i++) {
          var opt = document.createElement("option");
          opt.value = String(i);
          opt.textContent = ls[i];
          startSel.appendChild(opt);
        }
        state.start = 0;
        startSel.value = "0";
      }

      controls.appendChild(accWrap);
      controls.appendChild(granGroup);
      controls.appendChild(startWrap);
      buildStartOptions();
      controls.hidden = false;

      // ----- render -----
      function render() {
        var acct = account();
        Object.keys(granButtons).forEach(function (k) {
          granButtons[k].setAttribute("aria-pressed", String(k === state.granularity));
        });

        var ls = labels().slice(state.start);
        var table = document.createElement("table");
        var cap = document.createElement("caption");
        var noun = state.granularity === "week" ? "weekly" : "monthly";
        cap.textContent = acct.name + " — " + noun + " roll-up · " + acct.source + " source · synthetic data";
        table.appendChild(cap);

        var thead = document.createElement("thead");
        var hrow = document.createElement("tr");
        hrow.appendChild(th("Metric", "col"));
        ls.forEach(function (lbl) { hrow.appendChild(th(lbl, "col")); });
        hrow.appendChild(th("Trend", "col"));
        thead.appendChild(hrow);
        table.appendChild(thead);

        var tbody = document.createElement("tbody");
        data.metricsMeta.forEach(function (meta) {
          var full = seriesFor(acct, meta);
          var vals = full.slice(state.start);
          var row = document.createElement("tr");
          row.appendChild(th(meta.label, "row"));
          vals.forEach(function (v) {
            var td = document.createElement("td");
            td.textContent = formatValue(meta, v);
            row.appendChild(td);
          });
          var delta = vals[vals.length - 1] - vals[0];
          row.appendChild(trendCell(meta, delta));
          tbody.appendChild(row);
        });
        table.appendChild(tbody);

        grid.innerHTML = "";
        grid.appendChild(table);

        if (status) {
          status.textContent = "Showing " + noun + " view for " + acct.name +
            " — " + ls.length + " " + (state.granularity === "week" ? "weeks" : "periods") +
            " from " + ls[0] + ".";
        }
      }

      function th(text, scope) {
        var el = document.createElement("th");
        el.setAttribute("scope", scope);
        el.textContent = text;
        return el;
      }
      function trendCell(meta, delta) {
        var td = document.createElement("td");
        td.className = "rollup-trend";
        var good;
        if (meta.higherIsBetter === null || delta === 0) good = null;
        else good = (delta > 0) === meta.higherIsBetter;
        var arrow = delta > 0 ? "▲" : delta < 0 ? "▼" : "–";
        td.classList.add(good === null ? "is-flat" : good ? "is-good" : "is-bad");
        td.textContent = arrow + " " + formatDelta(meta, delta);
        td.setAttribute("aria-label",
          (delta > 0 ? "up " : delta < 0 ? "down " : "no change ") + formatDelta(meta, delta) +
          (good === null ? "" : good ? ", improving" : ", worse"));
        return td;
      }

      render();
    });
  }
})();
