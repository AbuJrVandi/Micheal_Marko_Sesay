(() => {
  const form = document.querySelector("#consultation-form");
  const status = document.querySelector("#form-status");
  const submitButton = form?.querySelector('button[type="submit"]');
  const config = window.emailJsConfig;

  if (!form || !status || !submitButton || !config) return;

  const isConfigured = [config.publicKey, config.serviceId, config.templateId]
    .every((value) => value && !value.startsWith("YOUR_EMAILJS_"));

  const updateStatus = (message, type) => {
    status.textContent = message;
    status.dataset.state = type;
  };

  if (isConfigured && window.emailjs) {
    window.emailjs.init({
      publicKey: config.publicKey,
      blockHeadless: true,
      limitRate: { id: "michael-marko-sesay-contact", throttle: 10000 }
    });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (form.elements.website.value) {
      form.reset();
      updateStatus("Thank you. Your enquiry has been received.", "success");
      return;
    }

    if (!isConfigured || !window.emailjs) {
      updateStatus("Online sending is being configured. Please use the direct email link below.", "error");
      return;
    }

    const originalLabel = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Sending…";
    updateStatus("Sending your consultation request…", "pending");

    try {
      await window.emailjs.send(config.serviceId, config.templateId, {
        from_name: form.elements.from_name.value.trim(),
        from_email: form.elements.from_email.value.trim(),
        subject: form.elements.subject.value.trim(),
        message: form.elements.message.value.trim(),
        submitted_at: new Date().toLocaleString()
      });

      form.reset();
      updateStatus("Thank you. Your consultation request was sent successfully.", "success");
    } catch {
      updateStatus("Your message could not be sent. Please use the direct email link below.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
    }
  });
})();
