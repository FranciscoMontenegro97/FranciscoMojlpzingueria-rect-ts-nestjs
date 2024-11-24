import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar__container">
        <div className="navbar__logo">
          <img src="/images/logo.png" alt="JLPZingueria" />
        </div>

        <div className="navbar__menu">
          <button className="navbar__menu-item" onClick={() => scrollToSection('trabajos')}>
            Nuestros Trabajos
          </button>
          <button className="navbar__menu-item" onClick={() => scrollToSection('contacto')}>
            Contacto
          </button>
          <button className="navbar__menu-item" onClick={() => scrollToSection('careers')}>
            Trabaja con Nosotros
          </button>
        </div>

        <button
          className="navbar__mobile-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isOpen && (
          <div className="navbar__mobile-menu">
            <button className="navbar__mobile-menu-item" onClick={() => scrollToSection('trabajos')}>
              Nuestros Trabajos
            </button>
            <button className="navbar__mobile-menu-item" onClick={() => scrollToSection('contacto')}>
              Contacto
            </button>
            <button className="navbar__mobile-menu-item" onClick={() => scrollToSection('careers')}>
              Trabaja con Nosotros
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;