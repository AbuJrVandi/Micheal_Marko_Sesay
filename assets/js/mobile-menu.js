(() => {
  const setupMobileMenu = () => {
    const header = document.querySelector(".header-inner");
    const navigation = document.querySelector(".desktop-nav");

    if (!header || !navigation || header.querySelector(".mobile-menu-toggle")) return;

    navigation.id = "site-navigation";

    const button = document.createElement("button");
    button.className = "mobile-menu-toggle";
    button.type = "button";
    button.setAttribute("aria-controls", navigation.id);
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open navigation menu");
    button.innerHTML = '<span class="menu-icon" aria-hidden="true"><i></i><i></i><i></i></span><span class="visually-hidden">Menu</span>';
    header.append(button);

    const closeMenu = () => {
      navigation.classList.remove("mobile-menu-open");
      document.body.classList.remove("mobile-menu-open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open navigation menu");
    };

    button.addEventListener("click", () => {
      const willOpen = !navigation.classList.contains("mobile-menu-open");
      navigation.classList.toggle("mobile-menu-open", willOpen);
      document.body.classList.toggle("mobile-menu-open", willOpen);
      button.setAttribute("aria-expanded", String(willOpen));
      button.setAttribute("aria-label", willOpen ? "Close navigation menu" : "Open navigation menu");
    });

    navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (navigation.classList.contains("mobile-menu-open") && !header.contains(event.target)) closeMenu();
    });

    window.matchMedia("(min-width: 621px)").addEventListener("change", (event) => {
      if (event.matches) closeMenu();
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupMobileMenu, { once: true });
  } else {
    setupMobileMenu();
  }
})();
