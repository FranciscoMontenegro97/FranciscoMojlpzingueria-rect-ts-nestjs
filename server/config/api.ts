export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://tu-dominio.com' // URL de producción
  : 'http://localhost:3000'; // URL de desarrollo