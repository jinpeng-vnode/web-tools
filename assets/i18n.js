(function (global) {
  var KEY = "web-tools-lang";

  function detect() {
    try {
      var q = new URLSearchParams(location.search).get("lang");
      if (q === "en" || q === "zh") return q;
      var stored = localStorage.getItem(KEY);
      if (stored === "en" || stored === "zh") return stored;
    } catch (e) {}
    return (navigator.language || "en").toLowerCase().indexOf("zh") === 0 ? "zh" : "en";
  }

  var lang = detect();

  function apply(i18n) {
    var pack = (i18n && i18n[lang]) || (i18n && i18n.en) || {};
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = pack[el.getAttribute("data-i18n")];
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var v = pack[el.getAttribute("data-i18n-placeholder")];
      if (v != null) el.setAttribute("placeholder", v);
    });
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      var v = pack[el.getAttribute("data-i18n-title")];
      if (v != null) el.setAttribute("title", v);
    });
    if (pack["document.title"]) document.title = pack["document.title"];
    document.querySelectorAll("[data-lang]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
  }

  function set(next, i18n) {
    if (next !== "en" && next !== "zh") return;
    lang = next;
    try {
      localStorage.setItem(KEY, next);
    } catch (e) {}
    try {
      var url = new URL(location.href);
      url.searchParams.set("lang", next);
      history.replaceState(null, "", url);
    } catch (e) {}
    apply(i18n);
  }

  global.WTLang = {
    get: function () {
      return lang;
    },
    apply: apply,
    set: set,
  };
})(window);
