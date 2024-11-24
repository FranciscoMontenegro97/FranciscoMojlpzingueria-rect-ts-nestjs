import { useEffect } from "react";

const ImageProtection = () => {
  useEffect(() => {
    // Prevenir click derecho
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Prevenir arrastrar imágenes
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // Prevenir atajos de teclado
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 's')) || // Ctrl + C o Ctrl + S
        (e.key === 'F12') || // F12
        (e.ctrlKey && e.shiftKey && e.key === 'i') // Ctrl + Shift + I
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
};

export default ImageProtection;