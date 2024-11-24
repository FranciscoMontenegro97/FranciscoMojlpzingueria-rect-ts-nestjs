import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <footer className="footer">
      <div className="footer__content">
        {/* Mapa del sitio */}
        <div className="footer__column">
          <h3 className="footer__title">Mapa del Sitio</h3>
          <ul className="footer__nav">
            <li><button onClick={() => scrollToSection('trabajos')}>Nuestros Trabajos</button></li>
            <li><button onClick={() => scrollToSection('contacto')}>Contacto</button></li>
            <li><button onClick={() => scrollToSection('careers')}>Trabaja con Nosotros</button></li>
          </ul>
        </div>

        {/* Horarios */}
        <div className="footer__column">
          <h3 className="footer__title">Horarios de Atención</h3>
          <ul className="footer__hours">
            <li>Lunes a Viernes: 8:00 - 16:30</li>
            <li>Sábados: Cerrado</li>
            <li>Domingos: Cerrado</li>
          </ul>
        </div>

        {/* Logo y redes sociales */}
        <div className="footer__column">
          <img src="/images/logo.png" alt="JLPZingueria" className="footer__logo" />
          <div className="footer__social">
            <a href="https://www.instagram.com/jlpzingueria/?hl=es-la" target="_blank" rel="noopener noreferrer" className="footer__social-link">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/people/JLP-Zingueria/100067779081886/" target="_blank" rel="noopener noreferrer" className="footer__social-link">
              <FaFacebookF />
            </a>
            <a href="https://x.com/JlpZingueria" target="_blank" rel="noopener noreferrer" className="footer__social-link">
              <FaXTwitter />
            </a>
            <a href="https://www.linkedin.com/in/jose-luis-pangaro-666260181/" target="_blank" rel="noopener noreferrer" className="footer__social-link">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="footer__bottom">
        <p>© {currentYear} JLPZingueria - Todos los derechos reservados</p>
        <a
          href="https://www.linkedin.com/in/francisco-montenegro97/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__credit"
        >
          Desarrollado por Sunflowercompany <ExternalLink size={14} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;