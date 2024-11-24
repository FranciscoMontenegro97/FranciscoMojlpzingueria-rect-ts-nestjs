
const Hero = () => {
  return (
    <section className="hero">
      <img
        src="/images/hero-image.jpg"
        alt="Soldador trabajando"
        className="hero__image"
        loading="lazy" // Lazy loading nativo
        decoding="async" // Decodificación asíncrona
        fetchPriority="high" // Alta prioridad por ser imagen hero
      />
      <div className="hero__overlay"></div>
      <div className="hero__content">
        <h1 className="hero__title">JLPZingueria</h1>
        <p className="hero__description">
          Es una empresa familiar fundada en 1995 en la ciudad de Rosario,
          dedicada a brindar soluciones de alta calidad en trabajos de zinguería.
          Nuestro compromiso es ofrecer la mejor calidad y fiabilidad en cada proyecto que realizamos.
        </p>
      </div>
    </section>
  );
};

export default Hero;