
interface WorkItem {
  id: number;
  url: string;
  title: string;
}

const Portfolio = () => {
  const works: WorkItem[] = [
    { id: 1, title: "Ductos", url: "/images/portfolio/carousel-uno.png" },
    { id: 2, title: "Cañerias", url: "/images/portfolio/carousel-dos.png" },
    { id: 3, title: "Chimeneas", url: "/images/portfolio/carousel-tres.png" },
    { id: 4, title: "Campanas", url: "/images/portfolio/carousel-cuatro.png" },
    { id: 5, title: "Canaletas", url: "/images/portfolio/carousel-cinco.jpg" },
    { id: 6, title: "Eolicos", url: "/images/portfolio/carousel-seis.jpeg" },
    { id: 7, title: "Techos", url: "/images/portfolio/carousel-siete.jpg" },
    { id: 8, title: "Conducto", url: "/images/portfolio/carousel-ocho.jpeg" },
    { id: 9, title: "Ventilacion", url: "/images/portfolio/carousel-nueve.jpeg" },
    { id: 10, title: "Chapas", url: "/images/portfolio/carousel-diez.png" },
    // ... más imágenes hasta 10
  ];

  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Trabajos Realizados</h2>
        <p className="portfolio__subtitle">
          Conocé algunos de nuestros proyectos destacados
        </p>

        <div className="portfolio__grid">
          {works.map((work) => (
            <div key={work.id} className="portfolio__item">
              <img
                src={work.url}
                alt={work.title}
                className="portfolio__image"
                loading="lazy"
              />
              <div className="portfolio__overlay">
                <h3 className="portfolio__item-title">{work.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;