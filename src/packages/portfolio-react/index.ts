/**
 * Punto de entrada público (Public Seam / Interface) del paquete portfolio-react.
 * En cumplimiento de setup-ts-deep-modules, los consumidores solo importan este archivo raíz.
 */

export { PortfolioComponent, default } from './PortfolioComponent';
export type {
  ProjectContract,
  TechItemContract,
  PortfolioBridgeProps,
} from './types';
