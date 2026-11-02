// Local extension adapter. GPL-3.0-or-later; see NOTICE.md.
chrome.storage.local.get({ enabled: true, githubEnabled: null, regex: true }, (settings) => {
  if (!(settings.githubEnabled ?? settings.enabled)) return;
  const GM_getValue = (key, fallback) => {
    if (key === "enable_RegExp") return settings.regex;
    if (key === "enable_transDesc" || key === "enable_missedTerms") return false;
    return fallback;
  };
  const GM_setValue = () => {};
  const GM_registerMenuCommand = () => 0;
  const GM_unregisterMenuCommand = () => {};
  const GM_notification = () => {};
  const GM_xmlhttpRequest = () => { throw new Error("Online description translation is disabled in this extension."); };
  const GM_addStyle = (css) => {
    const style = document.createElement("style");
    style.textContent = css;
    (document.head || document.documentElement).append(style);
  };
