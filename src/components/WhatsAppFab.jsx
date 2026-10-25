/**
 * Floating WhatsApp chat shortcut.
 * The phone number and prefilled message are generated from shared site data.
 */
import site from "../data/site";

function WhatsAppFab() {
  // wa.me only accepts digits, so remove spaces and the leading plus.
  const digits = site.phoneHref.replace(/[^0-9]/g, "");
  // encodeURIComponent makes the prefilled message URL-safe.
  const message = encodeURIComponent(
    "Hi Rohit! I found your portfolio and would like to talk about a project."
  );

  return (
    <a
      className="whatsapp-fab"
      href={`https://wa.me/${digits}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <i className="ri-whatsapp-line" aria-hidden="true"></i>
    </a>
  );
}

export default WhatsAppFab;
