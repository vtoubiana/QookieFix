var api;
if (chrome == undefined) {
  api = browser;
} else {
  api = chrome;
}

function saveOptions(e) {
  e.preventDefault();
  api.storage.sync.set({
    auto_discard_enabled: document.querySelector("#auto-discard-enabled").checked,
    auto_discard_delay: document.querySelector("#auto-discard-delay").checked
  });
}

function restoreOptions() {
  function setCurrentState(result) {
    console.log(result);
    document.querySelector("#auto-discard-enabled").checked = result.auto_discard_enabled || false;
    document.querySelector("#auto-discard-delay").value = result.auto_discard_delay || 5;
  }
  api.storage.sync.get((result) => setCurrentState(result));
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.addEventListener("DOMContentLoaded", () => document.querySelector("form").onchange=saveOptions);

