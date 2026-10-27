// src/packages/mfe-config/tailwind.config.remote.js
/**
 * Configuración de Tailwind CSS aislada para el Remote de React.
 * - Utiliza prefijo 'tw-' para evitar colisiones con clases globales del Host.
 * - Deshabilita preflight para no romper los reseteos CSS de Angular.
 */
module.exports = {
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  content: [
    './src/packages/portfolio-react/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brandAmber: '#F59E0B',
        brandAmberDark: '#D97706',
      },
    },
  },
  plugins: [],
};
