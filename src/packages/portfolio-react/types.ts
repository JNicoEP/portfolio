/**
 * Tipos y contratos inmutables (Deep Module Contract) para el microfrontend de React.
 * Cumple con TypeScript estricto sin uso de 'any'.
 */

export interface ProjectContract {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly link: string;
  readonly screenshot: string;
  readonly tags: readonly string[];
  readonly status: 'EN LÍNEA' | 'EN PROCESO';
  readonly category: string;
}

export interface TechItemContract {
  readonly name: string;
  readonly category: string;
  readonly iconSvg: string;
}

export interface PortfolioBridgeProps {
  readonly isDarkMode: boolean;
  readonly onToggleTheme: () => void;
  readonly projects: readonly ProjectContract[];
  readonly technologiesRow1: readonly TechItemContract[];
  readonly technologiesRow2: readonly TechItemContract[];
  readonly cvUrl: string;
  readonly githubUrl: string;
  readonly whatsappUrl: string;
  readonly email: string;
  readonly onCopyEmail?: (email: string) => void;
}
