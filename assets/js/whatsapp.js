(() => {
  const addWhatsAppButton = () => {
    if (document.querySelector(".whatsapp-contact")) return;

    const contact = document.createElement("a");
    const pageUrl = window.location.href;
    const profilePhotoPath = window.location.pathname.includes("/pages/")
      ? "../assets/images/michael-marko-sesay.jpeg"
      : "assets/images/michael-marko-sesay.jpeg";
    const profilePhotoUrl = new URL(profilePhotoPath, pageUrl).href;
    const message = [
      "Hello Michael,",
      "",
      "I am contacting you through your portfolio website.",
      `Page: ${pageUrl}`,
      `Profile: ${profilePhotoUrl}`,
      "",
      "I would like to discuss a consultation."
    ].join("\n");

    contact.className = "whatsapp-contact";
    contact.href = `https://wa.me/23231465456?text=${encodeURIComponent(message)}`;
    contact.target = "_blank";
    contact.rel = "noopener noreferrer";
    contact.setAttribute("aria-label", "Chat with Michael Marko Sesay on WhatsApp");
    contact.innerHTML = '<span class="whatsapp-label">Chat on WhatsApp</span><span class="whatsapp-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z" /></svg></span>';
    document.body.append(contact);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addWhatsAppButton, { once: true });
  } else {
    addWhatsAppButton();
  }
})();
