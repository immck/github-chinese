"use strict";
const githubEnabled = document.getElementById("githubEnabled");
const redditEnabled = document.getElementById("redditEnabled");
const regex = document.getElementById("regex");
const status = document.getElementById("status");
const refresh = document.getElementById("refresh");
githubEnabled.disabled = redditEnabled.disabled = regex.disabled = true;
chrome.storage.local.get({ enabled: true, githubEnabled: null, redditEnabled: true, regex: true, siteSettingsVersion: 1 }).then(async (settings) => {
  githubEnabled.checked = settings.githubEnabled ?? settings.enabled;
  redditEnabled.checked = settings.siteSettingsVersion >= 2
    ? settings.redditEnabled : settings.enabled && settings.redditEnabled;
  if (settings.siteSettingsVersion < 2) {
    await chrome.storage.local.set({
      githubEnabled: githubEnabled.checked,
      redditEnabled: redditEnabled.checked,
      siteSettingsVersion: 2,
    });
  }
  regex.checked = settings.regex;
  githubEnabled.disabled = redditEnabled.disabled = regex.disabled = false;
}).catch((error) => { status.textContent = error.message; });
for (const input of [githubEnabled, redditEnabled, regex]) {
  input.addEventListener("change", async () => {
    try {
      await chrome.storage.local.set({ [input.id]: input.checked });
      status.textContent = "已保存，刷新页面后生效";
    } catch (error) { status.textContent = error.message; }
  });
}
refresh.addEventListener("click", async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) throw new Error("没有找到当前标签页");
    await chrome.tabs.reload(tab.id);
    window.close();
  } catch (error) { status.textContent = error.message; }
});
