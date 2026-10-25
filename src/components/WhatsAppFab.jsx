import site from "../data/site";

function WhatsAppFab() {
  const digits = site.phoneHref.replace(/[^0-9]/g, "");
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
