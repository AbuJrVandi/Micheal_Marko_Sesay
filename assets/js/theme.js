(() => {
  const storageKey = "michael-marko-sesay-theme";
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  const getStoredTheme = () => {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  };

  const setStoredTheme = (theme) => {
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // The visual theme still works if browser storage is unavailable.
    }
  };

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  };

  const initialTheme = getStoredTheme() || (systemPrefersDark.matches ? "dark" : "light");
  applyTheme(initialTheme);

  const createToggle = () => {
    const header = document.querySelector(".header-inner");
    if (!header || header.querySelector(".theme-toggle")) return;

    const button = document.createElement("button");
    button.className = "theme-toggle";
    button.type = "button";

    const updateButton = () => {
      const isDark = document.documentElement.dataset.theme === "dark";
      button.innerHTML = `<span aria-hidden="true">${isDark ? "☀" : "☾"}</span><span class="theme-toggle-text">${isDark ? "Light mode" : "Dark mode"}</span>`;
      button.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
      button.title = button.getAttribute("aria-label");
    };

    button.addEventListener("click", () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      setStoredTheme(nextTheme);
      updateButton();
    });

    updateButton();
    header.append(button);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createToggle, { once: true });
  } else {
    createToggle();
  }
})();
