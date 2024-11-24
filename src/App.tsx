import './App.scss'
import { useState, useEffect } from 'react';
import WhatsAppButton from './components/common/WhatsAppButton'
import Footer from './components/layout/Footer'
import Hero from './components/layout/Hero'
import Navbar from './components/layout/Navbar'
import Careers from './components/sections/Careers'
import Contact from './components/sections/Contact'
import Portfolio from './components/sections/Portfolio'
import Services from './components/sections/Services'
import Loading from './components/common/Loading';
import ImageProtection from './components/common/ImageProtection';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Función para precargar imágenes
    const preloadImages = async () => {
      const imageUrls = [
        //Logo
        '/images/logo.png',
        //Hero-Image
        '/images/hero-image.jpg',
        //Services-images
        '/images/img-services/chapa-servicio.png',
        '/images/img-services/campana-servicio.png',
        '/images/img-services/ventilacion-servicio.png',
        '/images/img-services/corte-servicio.png',
        '/images/img-services/desague-servicio.png',
        //Portfolio-iamges
        '/images/portfolio/carousel-uno.png',
        '/images/portfolio/carousel-dos.png',
        '/images/portfolio/carousel-tres.png',
        '/images/portfolio/carousel-cuatro.png',
        '/images/portfolio/carousel-cinco.png',
        '/images/portfolio/carousel-seis.png',
        '/images/portfolio/carousel-siete.png',
        '/images/portfolio/carousel-ocho.png',
        '/images/portfolio/carousel-nueve.png',
        '/images/portfolio/carousel-diez.png',
        //Career-iamge
        '/images/careers-image.jpg',
        // ... añadir todas las imágenes del sitio
      ];

      const loadImage = (url: string): Promise<void> =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve();
          img.onerror = () => reject();
        });

      try {
        await Promise.all(imageUrls.map(loadImage));
      } catch (error) {
        console.error('Error al cargar imágenes:', error);
      }
    };

    // Función principal de inicialización
    const init = async () => {
      try {
        await preloadImages();
        // Simulamos tiempo mínimo de carga para mejor UX
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
      } catch (error) {
        console.error('Error en la inicialización:', error);
        setIsLoading(false);
      }
    };

    init();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (

    <>
      {/*Si tenemos que realizar alguna modificacion quitamos ImageProtection temporalmente  */}
      <ImageProtection />
      <Navbar />
      <WhatsAppButton />
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
      <Careers />
      <Footer />
    </>
  )
}

export default App
