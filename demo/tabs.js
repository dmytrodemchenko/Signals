export function initTabs() {
  const tabButtons = Array.from(document.querySelectorAll("[data-tab-target]"));
  const tabPanels = Array.from(document.querySelectorAll("[data-tab-panel]"));

  function selectTab(name) {
    for (const button of tabButtons) {
      const isActive = button.dataset.tabTarget === name;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    }

    for (const panel of tabPanels) {
      panel.hidden = panel.dataset.tabPanel !== name;
    }
  }

  for (const button of tabButtons) {
    button.addEventListener("click", () => selectTab(button.dataset.tabTarget));
  }

  selectTab("demo");
}
