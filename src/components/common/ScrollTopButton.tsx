import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Controlar la visibilidad del botón
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-top"
          aria-label="Volver arriba"
        >
          <FaArrowUp className="scroll-top__icon" />
        </button>
      )}
    </>
  );
};

export default ScrollTopButton;