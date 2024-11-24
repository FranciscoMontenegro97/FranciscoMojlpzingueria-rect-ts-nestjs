import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = '+5493416354040'; // Reemplazar con el número real
  const message = 'Hola! Me gustaría consultar sobre sus servicios'; // Mensaje predeterminado

  const handleClick = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <button
      onClick={handleClick}
      className="whatsapp-button"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp className="whatsapp-button__icon" />
      <span className="whatsapp-button__text">
        Escribinos por WhatsApp
      </span>
    </button>
  );
};

export default WhatsAppButton;