import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Colocación de techos de Chapa",
    description: "Instalación profesional de techos con los más altos estándares de calidad y seguridad.",
    image: "/images/img-services/chapa-servicio.png"
  },
  {
    id: 2,
    title: "Instalación de Campanas Gastronómicas",
    description: "Diseño e instalación de sistemas de extracción para cocinas industriales y comerciales.",
    image: "/images/img-services/campana-servicio.png"
  },
  {
    id: 3,
    title: "Estructuras de Ventilación",
    description: "Desarrollo de sistemas de ventilación eficientes adaptados a cada espacio.",
    image: "/images/img-services/ventilacion-servicio.png"
  },
  {
    id: 4,
    title: "Cortes de Chapa a Medida",
    description: "Precisión y exactitud en cada corte, ajustándonos a sus especificaciones.",
    image: "/images/img-services/corte-servicio.png"
  },
  {
    id: 5,
    title: "Desagües",
    description: "Soluciones completas en sistemas de desagüe y canalización de agua.",
    image: "images/img-services/desague-servicio.png"
  }
];

const Services = () => {
  const [activeService, setActiveService] = useState(services[0]);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  // Función para cambiar al siguiente servicio
  const moveToNextService = useCallback(() => {
    setActiveService(prev => {
      const nextIndex = services.findIndex(s => s.id === prev.id) + 1;
      return services[nextIndex] || services[0];
    });
  }, []);

  // Manejo del autoplay
  useEffect(() => {
    const autoPlayInterval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastInteraction = now - lastInteraction;

      // Si han pasado más de 10 segundos desde la última interacción
      if (timeSinceLastInteraction > 10000) {
        moveToNextService();
      }
    }, 5000); // Revisa cada 5 segundos

    return () => clearInterval(autoPlayInterval);
  }, [lastInteraction, moveToNextService]);

  return (
    <section id="trabajos" className="services">
      <div className="services__container">
        <div className="services__header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="services__title"
          >
            Nuestros Trabajos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="services__description"
          >
            Somos especialistas en trabajos con chapas galvanizadas, destacándonos
            en la fabricación e instalación de eólicos y campanas gastronómicas.
            Nuestra experiencia nos permite ofrecer soluciones personalizadas que
            se adaptan a las necesidades específicas de cada cliente. Como empresa
            líder en Rosario, brindamos servicios tanto mayoristas como minoristas,
            extendiendo nuestra cobertura a todo el interior del país.
          </motion.p>
        </div>

        <div className="services__content">
          <div className="services__image-container">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeService.id}
                src={activeService.image}
                alt={activeService.title}
                className="services__image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>

          <div className="services__list">
            {services.map((service) => (
              <motion.div
                key={service.id}
                className={`services__item ${activeService.id === service.id ? 'services__item--active' : ''
                  }`}
                onClick={() => {
                  setActiveService(service);
                  setLastInteraction(Date.now());
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="services__item-header">
                  <span className="services__item-number">
                    {service.id.toString().padStart(2, '0')}
                  </span>
                  <span className="services__item-title">{service.title}</span>
                </div>

                {/* Simplificamos primero para asegurarnos que las imágenes se muestran */}
                {activeService.id === service.id && (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="services__item-image"
                    loading="lazy"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="services__description-mobile"
          >
            <p>{activeService.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Services;