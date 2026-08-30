/*
 * EmailJS setup
 *
 * Replace the three placeholder values with the IDs from your EmailJS dashboard.
 * In your EmailJS template, set the recipient in the dashboard to
 * sesay.michael@students.jkuat.ac.ke and use these variables:
 * {{from_name}}, {{from_email}}, {{subject}}, {{message}}, {{submitted_at}}
 *
 * A public key is safe for browser use. Never add an EmailJS private key here.
 */
window.emailJsConfig = Object.freeze({
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  serviceId: "service_g71pji9",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID",
  recipientEmail: "sesay.michael@students.jkuat.ac.ke"
});
