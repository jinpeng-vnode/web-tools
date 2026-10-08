(function (global) {
  var KEY = "web-tools-theme";

  function detect() {
    try {
      var q = new URLSearchParams(location.search).get("theme");
      if (q === "dark" || q === "light") return q;
      var stored = localStorage.getItem(KEY);
      if (stored === "dark" || stored === "light") return stored;
    } catch (e) {}
    try {
      if (global.matchMedia && matchMedia("(prefers-color-scheme: light)").matches) return "light";
    } catch (e) {}
    return "dark";
  }

  var theme = detect();

  function paint() {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    document.querySelectorAll("[data-theme-set]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-theme-set") === theme);
    });
  }

  paint();

  function set(next) {
    if (next !== "dark" && next !== "light") return;
    theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch (e) {}
    try {
      var url = new URL(location.href);
      url.searchParams.set("theme", next);
      history.replaceState(null, "", url);
    } catch (e) {}
    paint();
  }

  function bind() {
    document.querySelectorAll("[data-theme-set]").forEach(function (btn) {
      if (btn.getAttribute("data-theme-bound")) return;
      btn.setAttribute("data-theme-bound", "1");
      btn.addEventListener("click", function () {
        set(btn.getAttribute("data-theme-set"));
      });
    });
    paint();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }

  global.WTTheme = {
    get: function () {
      return theme;
    },
    set: set,
    apply: paint,
    bind: bind,
  };
})(window);
