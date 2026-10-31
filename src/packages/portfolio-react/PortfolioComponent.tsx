import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import type { PortfolioBridgeProps, ProjectContract } from './types';

const i18n = {
  es: {
    nav: {
      role: 'Ingeniero en Informática',
      projects: 'Proyectos',
      tech: 'Tecnologías',
      philosophy: 'Filosofía',
      education: 'Educación',
      contact: 'Contacto',
      available: 'Disponible',
      cvTitle: 'Descargar Curriculum Vitae en PDF',
      themeTitle: 'Alternar modo oscuro',
      langTitle: 'Cambiar a Inglés (Switch to English)',
    },
    companion: {
      sprint: '¡Acelerando por la página!',
      coding: '¡Programando en mi escritorio!',
      hello: '👋 ¡Hola! Explora mi portafolio',
      viewingProjects: '💻 Viendo proyectos en vivo',
      techPhilosophy: '⚡ Tecnologías y filosofía',
    },
    hero: {
      title1: 'Desarrollo de',
      titleHighlight: 'software',
      title2: 'escalable y moderno',
      desc: 'Ingeniero en Informática enfocado en arquitecturas web de alto rendimiento, interfaces reactivas modernas y soluciones completas de extremo a extremo.',
      exploreProjects: 'Explorar proyectos',
      downloadCv: 'Descargar CV',
      copyEmail: 'Copiar email',
      copiedEmail: '¡Email copiado!',
      terminalTitle: '~/portfolio/developer.ts',
      terminalRole: "'Ingeniero en Informática'",
      terminalStatus: "'Open to Work'",
      codeCoffee: '☕ Code & Coffee',
      seniorReady: 'Full Stack Senior-Ready',
    },
    projects: {
      title: 'Proyectos destacados',
      desc: 'Aplicaciones completas con despliegues activos en producción, arquitecturas modernas y bases de datos integradas.',
      prefix: 'Proyecto',
      statusLive: 'EN LÍNEA',
      statusProcess: 'EN PROCESO',
      visitOfficial: 'Visitar sitio oficial',
      p1Subtitle: 'Sistema Institucional con BD & Aula Virtual con Roles',
      p1Desc: 'Sistema web integral para digitalizar la gestión escolar de la institución. Cuenta con arquitectura de base de datos relacional y autenticación con control de roles (directivos, docentes y alumnos), infografía escolar interactiva, proyectos estudiantiles y repositorio descargable de documentación.',
      p2Subtitle: 'Plataforma Web de Streaming de Películas',
      p2Desc: 'Plataforma audiovisual moderna para explorar y reproducir películas con diseño cinematográfico inmersivo. Desarrollada con React y TypeScript, incluye catálogo interactivo clasificado por géneros y tendencias, buscador en tiempo real y reproductor multimedia fluido.',
      p3Subtitle: 'Sistema Integral para Centro de Peluquería & Estética',
      p3Desc: 'Plataforma web con diseño editorial y minimalista para peluqueria. Integra catálogo interactivo de servicios estéticos, módulo dinámico de agenda y reserva de turnos online en tiempo real, cotizador y perfiles profesionales.',
    },
    skills: {
      title: 'Competencias técnicas',
      desc: 'Lenguajes de programación y herramientas que utilizo activamente para construir soluciones robustas.',
    },
    philosophy: {
      title: 'Filosofía de desarrollo',
      desc: 'Principios de ingeniería que aplico en cada proyecto para garantizar calidad y sostenibilidad.',
      p1Title: 'Arquitectura Limpia',
      p1Desc: 'Módulos desacoplados, código legible y principios SOLID que facilitan el mantenimiento a largo plazo.',
      p2Title: 'Alto Rendimiento',
      p2Desc: 'Bundles ligeros, renderizado optimizado y métricas de Core Web Vitals al máximo para una carga instantánea.',
      p3Title: 'Seguridad y Datos',
      p3Desc: 'Modelado relacional robusto en PostgreSQL, control de acceso por roles (RBAC) y validaciones estrictas.',
      p4Title: 'Entrega Ágil',
      p4Desc: 'Despliegues automatizados, control de versiones con Git y pruebas exhaustivas antes de pasar a producción.',
    },
    education: {
      title: 'Formación académica',
      desc: 'Bases universitarias y técnicas en ciencias de la computación, sistemas y resolución analítica de problemas.',
      d1Badge: 'Graduación 2026 · Título de Grado',
      d1Status: 'Egresado',
      d1Title: 'Ingeniero en Informática',
      d1School: 'Universidad del Norte Santo Tomás de Aquino (UNSTA)',
      d1Desc: 'Formación integral en diseño de algoritmos avanzados, desarrollo full stack, bases de datos distribuidas y gestión de proyectos tecnológicos.',
      d1Bullet1: 'Diseño y análisis de algoritmos y estructuras de datos complejas.',
      d1Bullet2: 'Arquitectura de sistemas operativos, redes y sistemas distribuidos.',
      d1Bullet3: 'Modelado relacional en PostgreSQL y control de acceso RBAC.',
      d1FootLeft: 'Concepción / Tucumán',
      d1FootRight: '5 Años de Carrera',
      d2Badge: 'Nivel Secundario Técnico',
      d2Status: 'Graduado',
      d2Title: 'Técnico Electromecánico',
      d2School: 'Escuela Técnica N°1 de Monteros',
      d2Desc: 'Formación técnica con fuerte base práctica en resolución metódica de averías, esquemas lógicos y trabajo en equipo multidisciplinario.',
      d2Bullet1: 'Diagnóstico metódico y resolución de averías en entornos técnicos.',
      d2Bullet2: 'Pensamiento analítico estructurado y metodologías de precisión.',
      d2Bullet3: 'Lógica de control, circuitos y esquemas electromecánicos.',
      d2FootLeft: 'Monteros / Tucumán',
      d2FootRight: 'Título Técnico Oficial',
    },
    contact: {
      title: '¿Construimos algo extraordinario juntos?',
      desc: 'Disponible para integrarme a equipos de ingeniería o liderar proyectos de software escalables. Conversemos.',
      whatsapp: 'Escribir por WhatsApp',
      email: 'Enviar correo directo',
      copyRight: '© 2026 José Nicolás Espinoza Perillo · Monteros, Tucumán, Argentina',
      backToTop: 'Volver arriba ↑',
      downloadCv: 'Descargar CV',
    },
  },
  en: {
    nav: {
      role: 'Software Engineer',
      projects: 'Projects',
      tech: 'Technologies',
      philosophy: 'Philosophy',
      education: 'Education',
      contact: 'Contact',
      available: 'Available',
      cvTitle: 'Download Curriculum Vitae (PDF)',
      themeTitle: 'Toggle dark mode',
      langTitle: 'Switch to Spanish (Cambiar a Español)',
    },
    companion: {
      sprint: 'Sprinting through the page!',
      coding: 'Coding at my desk!',
      hello: '👋 Hi! Explore my portfolio',
      viewingProjects: '💻 Browsing live projects',
      techPhilosophy: '⚡ Tech stack & philosophy',
    },
    hero: {
      title1: 'Building modern &',
      titleHighlight: 'scalable',
      title2: 'software solutions',
      desc: 'Software Engineer specialized in high-performance web architectures, modern reactive interfaces, and full-stack end-to-end solutions.',
      exploreProjects: 'Explore projects',
      downloadCv: 'Download CV',
      copyEmail: 'Copy email',
      copiedEmail: 'Email copied!',
      terminalTitle: '~/portfolio/developer.ts',
      terminalRole: "'Software Engineer'",
      terminalStatus: "'Open to Work'",
      codeCoffee: '☕ Code & Coffee',
      seniorReady: 'Full Stack Senior-Ready',
    },
    projects: {
      title: 'Featured Projects',
      desc: 'Full-stack applications with active production deployments, modern architectures, and integrated relational databases.',
      prefix: 'Project',
      statusLive: 'LIVE',
      statusProcess: 'IN PROGRESS',
      visitOfficial: 'Visit live site',
      p1Subtitle: 'Institutional System with DB & Role-Based Virtual Classroom',
      p1Desc: 'Comprehensive web platform to digitize institutional school management. Features relational database architecture, role-based access control (principals, teachers, and students), interactive infographics, student showcases, and downloadable document repository.',
      p2Subtitle: 'Movie Streaming Web Platform',
      p2Desc: 'Modern audiovisual platform to explore and stream movies with an immersive cinematic design. Built with React and TypeScript, includes interactive catalog categorized by genres and trends, real-time search, and smooth media playback.',
      p3Subtitle: 'Comprehensive System for Hair Salon & Aesthetics Studio',
      p3Desc: 'Editorial and minimalist web platform for hair salons and beauty studios. Integrates interactive beauty service catalog, dynamic real-time appointment booking engine, service cost estimator, and professional staff profiles.',
    },
    skills: {
      title: 'Technical Skills',
      desc: 'Programming languages and tools I actively use to engineer robust software solutions.',
    },
    philosophy: {
      title: 'Engineering Philosophy',
      desc: 'Core engineering principles applied across every project to guarantee quality and long-term maintainability.',
      p1Title: 'Clean Architecture',
      p1Desc: 'Decoupled modules, clean readable code, and SOLID principles that ensure effortless long-term maintainability.',
      p2Title: 'High Performance',
      p2Desc: 'Lightweight bundles, optimized rendering, and top Core Web Vitals scores for near-instant load times.',
      p3Title: 'Security & Data Integrity',
      p3Desc: 'Robust relational modeling in PostgreSQL, role-based access control (RBAC), and strict data validations.',
      p4Title: 'Agile Delivery',
      p4Desc: 'Automated CI/CD deployments, Git version control, and thorough verification before production releases.',
    },
    education: {
      title: 'Education & Qualifications',
      desc: 'University and technical foundations in computer science, systems engineering, and analytical problem-solving.',
      d1Badge: 'Graduation 2026 · Bachelor’s Degree',
      d1Status: 'Graduate',
      d1Title: 'Computer Systems Engineer',
      d1School: 'Saint Thomas Aquinas University of the North (UNSTA)',
      d1Desc: 'Comprehensive education in advanced algorithms, full-stack software development, distributed databases, and agile tech project management.',
      d1Bullet1: 'Design and analysis of advanced algorithms and complex data structures.',
      d1Bullet2: 'Operating systems architecture, networking, and distributed systems.',
      d1Bullet3: 'Relational data modeling in PostgreSQL and role-based access control (RBAC).',
      d1FootLeft: 'Concepción / Tucumán',
      d1FootRight: '5-Year Degree',
      d2Badge: 'Technical Secondary Education',
      d2Status: 'Graduated',
      d2Title: 'Electromechanical Technician',
      d2School: 'Technical High School N°1 of Monteros',
      d2Desc: 'Technical education with a solid practical foundation in methodical troubleshooting, logical schematics, and multidisciplinary teamwork.',
      d2Bullet1: 'Methodical diagnostics and technical troubleshooting in industrial environments.',
      d2Bullet2: 'Structured analytical thinking and precision technical methodologies.',
      d2Bullet3: 'Control logic, electrical circuits, and electromechanical diagrams.',
      d2FootLeft: 'Monteros / Tucumán',
      d2FootRight: 'Official Technical Degree',
    },
    contact: {
      title: 'Shall we build something extraordinary together?',
      desc: 'Available to join engineering teams or lead scalable software projects. Let’s talk.',
      whatsapp: 'Message on WhatsApp',
      email: 'Send direct email',
      copyRight: '© 2026 José Nicolás Espinoza Perillo · Monteros, Tucumán, Argentina',
      backToTop: 'Back to top ↑',
      downloadCv: 'Download CV',
    },
  },
};

const getCategoryLabel = (category: string, lang: 'es' | 'en') => {
  if (lang === 'es') return category;
  switch (category) {
    case 'Lenguaje': return 'Language';
    case 'Framework': return 'Framework';
    case 'Biblioteca UI': return 'UI Library';
    case 'Base de Datos': return 'Database';
    case 'BaaS / DB': return 'BaaS / DB';
    case 'Estilos / UI': return 'Styles / UI';
    case 'Estructura Web': return 'Web Structure';
    case 'Estilos Web': return 'Web Styling';
    case 'Control de Versiones': return 'Version Control';
    default: return category;
  }
};

export const PortfolioComponent: React.FC<PortfolioBridgeProps> = memo(({
  isDarkMode,
  onToggleTheme,
  language = 'es',
  onToggleLanguage,
  projects,
  technologiesRow1,
  technologiesRow2,
  cvUrl,
  githubUrl,
  whatsappUrl,
  email,
  onCopyEmail,
}) => {
  const [currentLang, setCurrentLang] = useState<'es' | 'en'>(language || 'es');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (language) {
      setCurrentLang(language);
    }
  }, [language]);

  const handleToggleLanguage = () => {
    const nextLang = currentLang === 'es' ? 'en' : 'es';
    setCurrentLang(nextLang);
    if (onToggleLanguage) {
      onToggleLanguage();
    }
  };

  const t = i18n[currentLang];

  // Escucha reactiva de scroll para animar el compañero 2D
  const handleScroll = useCallback((): void => {
    const docElement = document.documentElement;
    const docHeight = docElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const progress = Math.min(Math.max(window.scrollY / docHeight, 0), 1);
      setScrollProgress(progress);
      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 260);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [handleScroll]);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    if (onCopyEmail) onCopyEmail(email);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const getProjectLocalized = (p: ProjectContract) => {
    if (currentLang === 'es') return p;
    if (p.id === '01') {
      return {
        ...p,
        subtitle: t.projects.p1Subtitle,
        description: t.projects.p1Desc,
        status: t.projects.statusLive,
      };
    }
    if (p.id === '02') {
      return {
        ...p,
        subtitle: t.projects.p2Subtitle,
        description: t.projects.p2Desc,
        status: t.projects.statusLive,
      };
    }
    if (p.id === '03') {
      return {
        ...p,
        subtitle: t.projects.p3Subtitle,
        description: t.projects.p3Desc,
        status: t.projects.statusProcess,
      };
    }
    return p;
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 relative overflow-x-hidden ${isDarkMode ? 'dark bg-[#090A0D] text-zinc-100' : 'bg-[#F6F7F9] text-zinc-900'}`}>
      
      {/* 1. BARRA DE PROGRESO DE SCROLL */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-[70]">
        <div 
          className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* 2. COMPAÑERO 2D EN TIEMPO REAL */}
      <aside 
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3 select-none pointer-events-none transition-all duration-300 ${
          scrollProgress >= 0.9 ? 'scale-105' : 'opacity-90'
        }`}
      >
        {/* Globo de diálogo contextual */}
        <div className="hidden sm:flex pointer-events-auto glass bg-white/95 dark:bg-zinc-900/95 border border-zinc-200/80 dark:border-zinc-800/80 px-3.5 py-2 rounded-2xl shadow-card text-xs font-medium text-zinc-700 dark:text-zinc-300 items-center gap-2 animate-float">
          {isScrolling && scrollProgress < 0.85 ? (
            <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5">
              <span>🏃‍♂️</span>
              <span>{t.companion.sprint}</span>
            </span>
          ) : scrollProgress >= 0.85 ? (
            <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5">
              <span>☕</span>
              <span>{t.companion.coding}</span>
            </span>
          ) : scrollProgress < 0.2 ? (
            <span>{t.companion.hello}</span>
          ) : scrollProgress < 0.55 ? (
            <span>{t.companion.viewingProjects}</span>
          ) : (
            <span>{t.companion.techPhilosophy}</span>
          )}
        </div>

        {/* Mini Avatar 2D */}
        <div className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl glass bg-white/95 dark:bg-zinc-900/95 border border-amber-300/60 dark:border-amber-700/50 shadow-card flex items-center justify-center relative overflow-hidden group">
          {scrollProgress < 0.85 ? (
            <div className={`w-13 h-15 sm:w-14 sm:h-16 relative transition-transform ${isScrolling ? 'companion-running' : 'companion-walking'}`}>
              <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Estelas de viento al correr */}
                {isScrolling && (
                  <g>
                    <line x1="16" y1="52" x2="6" y2="52" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" className="animate-speed-1" />
                    <line x1="22" y1="64" x2="8" y2="64" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" className="animate-speed-2" />
                    <line x1="18" y1="76" x2="6" y2="76" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" className="animate-speed-3" />
                    <circle cx="26" cy="106" r="3" fill="#D97706" opacity="0.6" className="animate-puff-1" />
                    <circle cx="20" cy="108" r="2" fill="#B45309" opacity="0.4" className="animate-puff-2" />
                  </g>
                )}

                {/* Pierna Izquierda articulada */}
                <g transform="translate(42, 82)">
                  <g className="companion-leg-left-pivot">
                    <line x1="0" y1="0" x2="0" y2="23" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
                    <rect x="-8" y="20" width="15" height="6.5" rx="3.2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.75" />
                  </g>
                </g>

                {/* Pierna Derecha articulada */}
                <g transform="translate(58, 82)">
                  <g className="companion-leg-right-pivot">
                    <line x1="0" y1="0" x2="0" y2="23" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
                    <rect x="-5" y="20" width="15" height="6.5" rx="3.2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.75" />
                  </g>
                </g>

                {/* Torso, Cabeza & Taza de café */}
                <g className="companion-body">
                  <circle cx="50" cy="30" r="16" fill="#FCD34D" />
                  <path d="M34 26C34 17.2 41.2 10 50 10C58.8 10 66 17.2 66 26C66 28 62 25 58 26C54 27 50 25 46 26C40 27 34 29 34 26Z" fill="#78350F" />
                  <circle cx="43" cy="30" r="5" stroke="#1F2937" strokeWidth="2.5" fill="#E0F2FE" fillOpacity="0.5" />
                  <circle cx="57" cy="30" r="5" stroke="#1F2937" strokeWidth="2.5" fill="#E0F2FE" fillOpacity="0.5" />
                  <line x1="48" y1="30" x2="52" y2="30" stroke="#1F2937" strokeWidth="2.5" />
                  <path d="M47 38C49 40 51 40 53 38" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
                  <path d="M30 52C30 46 36 44 50 44C64 44 70 46 70 52L68 85H32L30 52Z" fill="#F59E0B" />
                  <rect x="65" y="60" width="10" height="12" rx="2" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.5" />
                  <path d="M75 63C78 63 78 69 75 69" stroke="#D97706" strokeWidth="1.5" />
                  <path d="M68 56C69 54 71 54 72 56" stroke="#92400E" strokeWidth="1" className="animate-steam" />
                </g>
              </svg>
            </div>
          ) : (
            <div className="w-14 h-14 relative animate-float">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <rect x="10" y="65" width="80" height="6" rx="2" fill="#D97706" />
                <rect x="18" y="71" width="5" height="25" fill="#92400E" />
                <rect x="77" y="71" width="5" height="25" fill="#92400E" />
                <polygon points="32,65 68,65 64,48 36,48" fill="#1E293B" />
                <rect x="38" y="50" width="24" height="13" rx="1" fill="#0284C7" />
                <line x1="40" y1="53" x2="52" y2="53" stroke="#38BDF8" strokeWidth="1" />
                <line x1="40" y1="56" x2="58" y2="56" stroke="#4ADE80" strokeWidth="1" />
                <line x1="40" y1="59" x2="48" y2="59" stroke="#FBBF24" strokeWidth="1" />
                <circle cx="50" cy="32" r="11" fill="#FCD34D" />
                <path d="M39 30C39 24 44 19 50 19C56 19 61 24 61 30C61 31 58 29 55 30C52 31 50 30 47 30C43 30 39 31 39 30Z" fill="#78350F" />
                <circle cx="46" cy="33" r="3.5" stroke="#1F2937" strokeWidth="1.8" fill="#E0F2FE" />
                <circle cx="54" cy="33" r="3.5" stroke="#1F2937" strokeWidth="1.8" fill="#E0F2FE" />
                <line x1="49.5" y1="33" x2="50.5" y2="33" stroke="#1F2937" strokeWidth="1.8" />
                <path d="M36 46C36 42 41 40 50 40C59 40 64 42 64 46L62 65H38L36 46Z" fill="#F59E0B" />
                <rect x="72" y="56" width="8" height="9" rx="1.5" fill="#FFFFFF" stroke="#D97706" strokeWidth="1" />
                <path d="M80 58C82 58 82 63 80 63" stroke="#D97706" strokeWidth="1" />
                <path d="M74 53C75 51 77 51 78 53" stroke="#92400E" strokeWidth="1" className="animate-steam" />
              </svg>
            </div>
          )}
        </div>
      </aside>

      {/* 3. HERO MASTER CARD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-12 sm:pb-16">
        <div className="rounded-[2.5rem] sm:rounded-[3rem] bg-white dark:bg-[#111317] border border-zinc-200/80 dark:border-zinc-800/80 shadow-hero relative overflow-hidden transition-all">
          
          {/* Navegación integrada */}
          <nav className="px-6 sm:px-12 pt-7 pb-4 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 relative z-30">
            <a href="#" className="flex items-center gap-2.5 group">
              <span className="w-12 h-10 rounded-2xl bg-[#F59E0B] text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-md group-hover:scale-105 transition-transform">
                JNEP
              </span>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-zinc-900 dark:text-white uppercase font-sans leading-none">
                  Nicolás Espinoza
                </span>
                <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                  {t.nav.role}
                </span>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-8 text-xs font-bold text-zinc-600 dark:text-zinc-300">
              <a href="#proyectos" className="hover:text-[#F59E0B] transition-colors">{t.nav.projects}</a>
              <a href="#competencias" className="hover:text-[#F59E0B] transition-colors">{t.nav.tech}</a>
              <a href="#filosofia" className="hover:text-[#F59E0B] transition-colors">{t.nav.philosophy}</a>
              <a href="#formacion" className="hover:text-[#F59E0B] transition-colors">{t.nav.education}</a>
              <a href="#contacto" className="hover:text-[#F59E0B] transition-colors">{t.nav.contact}</a>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <a 
                href={cvUrl} 
                download="CV-Nicolas-Espinoza-Ingeniero.pdf" 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 hover:bg-[#F59E0B] text-[#D97706] dark:text-[#FBBF24] hover:text-white border border-amber-500/30 transition-all shadow-xs"
                title={t.nav.cvTitle}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>CV</span>
              </a>

              <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{t.nav.available}</span>
              </div>

              {/* Botón de cambio de idioma al lado del botón de cambiar de color */}
              <button 
                type="button"
                onClick={handleToggleLanguage} 
                className="w-10 h-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-[#F59E0B] transition-colors shadow-sm font-mono text-xs font-bold select-none group/lang"
                title={t.nav.langTitle}
                aria-label={t.nav.langTitle}
              >
                <span className="text-[11px] font-extrabold tracking-wider group-hover/lang:scale-110 transition-transform">
                  {currentLang === 'es' ? 'EN' : 'ES'}
                </span>
              </button>

              {/* Botón de cambiar de color (modo oscuro) */}
              <button 
                type="button"
                onClick={onToggleTheme} 
                className="w-10 h-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-[#F59E0B] transition-colors shadow-sm"
                title={t.nav.themeTitle}
                aria-label={t.nav.themeTitle}
              >
                {isDarkMode ? (
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                  </svg>
                )}
              </button>
            </div>
          </nav>

          {/* Hero Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px] lg:min-h-[580px] relative">
            <div className="lg:col-span-7 px-6 sm:px-12 py-12 lg:py-20 flex flex-col justify-center relative z-20">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.06]">
                {t.hero.title1} <br />
                <span className="inline-block px-4 py-1 bg-amber-100 dark:bg-amber-950/70 text-[#D97706] dark:text-[#FBBF24] rounded-2xl my-1">
                  {t.hero.titleHighlight}
                </span> <br />
                {t.hero.title2}
              </h1>

              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mt-6 max-w-xl leading-relaxed font-normal">
                {t.hero.desc}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
                <a 
                  href="#proyectos" 
                  className="px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[#D97706] hover:bg-[#F59E0B] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
                >
                  <span>{t.hero.exploreProjects}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                </a>

                <a 
                  href={cvUrl} 
                  download="CV-Nicolas-Espinoza-Ingeniero.pdf" 
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 sm:py-4 rounded-full border-2 border-amber-500/80 bg-amber-500/10 hover:bg-amber-500 text-[#D97706] dark:text-[#FBBF24] hover:text-white font-bold text-sm hover:border-amber-500 transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2 group/cv"
                >
                  <svg className="w-4 h-4 text-amber-500 dark:text-amber-400 group-hover/cv:text-white group-hover/cv:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <span>{t.hero.downloadCv}</span>
                </a>

                <a 
                  href={githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-6 py-3.5 sm:py-4 rounded-full border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-bold text-sm hover:border-[#D97706] transition-all shadow-sm inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
                  <span>GitHub</span>
                </a>

                <button 
                  type="button"
                  onClick={copyEmailToClipboard} 
                  className="px-5 py-3.5 sm:py-4 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold text-xs hover:text-zinc-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  {copiedEmail ? (
                    <>
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span>{t.hero.copiedEmail}</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                      <span>{t.hero.copyEmail}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Columna Derecha: IDE Terminal Mockup */}
            <div className="lg:col-span-5 relative flex items-center justify-center p-6 sm:p-10 overflow-hidden">
              <div className="absolute -right-16 -top-16 -bottom-16 w-[120%] bg-gradient-to-br from-[#FBBF24] via-[#F59E0B] to-[#D97706] rounded-l-[45%] opacity-90 dark:opacity-85 pointer-events-none transform rotate-3"></div>
              
              <span className="absolute top-8 left-10 text-3xl sm:text-4xl font-black text-amber-500 dark:text-amber-300 select-none animate-letter-1 drop-shadow-sm font-sans">C</span>
              <span className="absolute top-12 right-12 text-3xl sm:text-4xl font-black text-white/90 select-none animate-letter-2 drop-shadow-sm font-sans">O</span>
              <span className="absolute bottom-16 left-6 text-3xl sm:text-4xl font-black text-zinc-900 select-none animate-letter-3 drop-shadow-sm font-sans">D</span>
              <span className="absolute bottom-12 right-10 text-4xl sm:text-5xl font-black text-white/90 select-none animate-letter-4 drop-shadow-sm font-sans">E</span>

              <div className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] flex flex-col items-center animate-float">
                <div className="w-full rounded-2xl bg-[#0F172A] border border-slate-700/80 shadow-2xl p-4 text-left font-mono text-[11px] leading-relaxed select-none transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-sans font-medium">{t.hero.terminalTitle}</span>
                    <span className="text-slate-500 text-[10px]">TypeScript</span>
                  </div>

                  <div className="space-y-1 text-slate-300">
                    <p><span className="text-pink-400">const</span> <span className="text-cyan-300">engineer</span> = &#123;</p>
                    <p className="pl-4"><span className="text-slate-400">name:</span> <span className="text-amber-300">&apos;Nicolás Espinoza&apos;</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">role:</span> <span className="text-amber-300">{t.hero.terminalRole}</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">graduation:</span> <span className="text-emerald-400">2026</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">stack:</span> [<span className="text-amber-300">&apos;Angular&apos;</span>, <span className="text-amber-300">&apos;React&apos;</span>, <span className="text-amber-300">&apos;PostgreSQL&apos;</span>],</p>
                    <p className="pl-4"><span className="text-slate-400">status:</span> <span className="text-emerald-400">{t.hero.terminalStatus}</span></p>
                    <p>&#125;;</p>
                  </div>
                </div>

                <div className="w-full flex items-center justify-between mt-3 px-1">
                  <div className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-amber-300/80 dark:border-amber-700/80 shadow-md flex items-center gap-1.5 text-[11px] font-bold text-zinc-800 dark:text-zinc-200">
                    <span>{t.hero.codeCoffee}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-amber-300/80 dark:border-amber-700/80 shadow-md flex items-center gap-1.5 text-[11px] font-bold text-zinc-800 dark:text-zinc-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{t.hero.seniorReady}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. PROYECTOS DESTACADOS CON BORDER BEAM */}
      <section id="proyectos" className="py-16 md:py-24 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              {t.projects.title}
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-xl">
              {t.projects.desc}
            </p>
          </div>

          <div className="space-y-16">
            {projects.map((origProject) => {
              const p = getProjectLocalized(origProject);
              return (
                <div key={p.id} className="border-beam-card group">
                  <div className="border-beam-inner p-6 sm:p-8 lg:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                      
                      <div className="lg:col-span-7 group/preview">
                        <a 
                          href={p.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="block rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-md group-hover/preview:shadow-2xl group-hover/preview:border-amber-500/60 transition-all duration-300"
                        >
                          <div className="h-9 bg-zinc-100 dark:bg-zinc-800/90 px-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700/60 select-none">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
                            </div>
                            <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 truncate max-w-[220px] sm:max-w-xs">
                              {p.link}
                            </div>
                            <div className="w-8"></div>
                          </div>

                          <div className="relative overflow-hidden aspect-[16/10] bg-zinc-950">
                            <img 
                              src={p.screenshot} 
                              alt={p.title}
                              loading="lazy"
                              className="w-full h-full object-cover object-top group-hover/preview:scale-[1.03] transition-transform duration-500" 
                            />
                          </div>
                        </a>
                      </div>

                      <div className="lg:col-span-5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                            <span className="font-bold text-zinc-400 dark:text-zinc-500">{t.projects.prefix} {p.id}</span>
                            <span className="text-zinc-300 dark:text-zinc-700">·</span>
                            <span className={`px-2.5 py-0.5 rounded-full font-semibold text-[11px] inline-flex items-center gap-1.5 ${
                              p.status === 'EN LÍNEA' || p.status === 'LIVE'
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50'
                                : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/50'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'EN LÍNEA' || p.status === 'LIVE' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                              <span>{p.status}</span>
                            </span>
                          </div>

                          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                            {p.title}
                          </h3>
                          <p className="text-xs font-semibold text-[#D97706] dark:text-[#FBBF24] mt-1 mb-4">
                            {p.subtitle}
                          </p>
                          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6 font-normal">
                            {p.description}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mb-8">
                            {p.tags.map((tag) => (
                              <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <a 
                            href={p.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#D97706] hover:bg-[#F59E0B] text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2"
                          >
                            <span>{t.projects.visitOfficial}</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. COMPETENCIAS TÉCNICAS (CON INFINITE SCROLL BIDIRECCIONAL & FADE MASK) */}
      <section id="competencias" className="py-20 md:py-24 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-[#0B0C0E] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            {t.skills.title}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl mx-auto">
            {t.skills.desc}
          </p>
        </div>

        <div className="w-full space-y-6">
          {/* Fila 1 */}
          <div className="skills-marquee-container">
            <div className="animate-infinite-scroll flex items-center">
              <div className="flex items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
                {technologiesRow1.map((tech) => (
                  <div key={tech.name} className="border-beam-card group cursor-default w-36 sm:w-44 flex-shrink-0">
                    <div className="border-beam-inner flex flex-col items-center justify-center p-4 sm:p-5">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center p-1 transition-transform duration-200 group-hover:scale-110">
                        <img src={tech.iconSvg} alt={tech.name} className="w-full h-full object-contain" loading="lazy" />
                      </div>
                      <span className="mt-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-[#D97706] dark:group-hover:text-[#FBBF24] transition-colors text-center truncate max-w-full">
                        {tech.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono mt-0.5 text-center">
                        {getCategoryLabel(tech.category, currentLang)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Duplicado idéntico */}
              <div className="flex items-center gap-4 sm:gap-6 pr-4 sm:pr-6" aria-hidden="true">
                {technologiesRow1.map((tech, idx) => (
                  <div key={`tech-row1-dup-${idx}`} className="border-beam-card group cursor-default w-36 sm:w-44 flex-shrink-0">
                    <div className="border-beam-inner flex flex-col items-center justify-center p-4 sm:p-5">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center p-1 transition-transform duration-200 group-hover:scale-110">
                        <img src={tech.iconSvg} alt={tech.name} className="w-full h-full object-contain" loading="lazy" />
                      </div>
                      <span className="mt-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-[#D97706] dark:group-hover:text-[#FBBF24] transition-colors text-center truncate max-w-full">
                        {tech.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono mt-0.5 text-center">
                        {getCategoryLabel(tech.category, currentLang)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fila 2 (Sentido inverso) */}
          <div className="skills-marquee-container">
            <div className="animate-infinite-scroll-reverse flex items-center">
              <div className="flex items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
                {technologiesRow2.map((tech) => (
                  <div key={tech.name} className="border-beam-card group cursor-default w-36 sm:w-44 flex-shrink-0">
                    <div className="border-beam-inner flex flex-col items-center justify-center p-4 sm:p-5">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center p-1 transition-transform duration-200 group-hover:scale-110">
                        <img src={tech.iconSvg} alt={tech.name} className="w-full h-full object-contain" loading="lazy" />
                      </div>
                      <span className="mt-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-[#D97706] dark:group-hover:text-[#FBBF24] transition-colors text-center truncate max-w-full">
                        {tech.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono mt-0.5 text-center">
                        {getCategoryLabel(tech.category, currentLang)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Duplicado idéntico */}
              <div className="flex items-center gap-4 sm:gap-6 pr-4 sm:pr-6" aria-hidden="true">
                {technologiesRow2.map((tech, idx) => (
                  <div key={`tech-row2-dup-${idx}`} className="border-beam-card group cursor-default w-36 sm:w-44 flex-shrink-0">
                    <div className="border-beam-inner flex flex-col items-center justify-center p-4 sm:p-5">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center p-1 transition-transform duration-200 group-hover:scale-110">
                        <img src={tech.iconSvg} alt={tech.name} className="w-full h-full object-contain" loading="lazy" />
                      </div>
                      <span className="mt-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-[#D97706] dark:group-hover:text-[#FBBF24] transition-colors text-center truncate max-w-full">
                        {tech.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono mt-0.5 text-center">
                        {getCategoryLabel(tech.category, currentLang)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FILOSOFÍA DE DESARROLLO */}
      <section id="filosofia" className="py-20 md:py-28 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              {t.philosophy.title}
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-xl">
              {t.philosophy.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border-beam-card group">
              <div className="border-beam-inner p-7 flex flex-col justify-between h-full">
                <div>
                  <span className="text-3xl mb-4 block">🧱</span>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{t.philosophy.p1Title}</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    {t.philosophy.p1Desc}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 mt-4 block font-semibold">Deep Modules</span>
              </div>
            </div>

            <div className="border-beam-card group">
              <div className="border-beam-inner p-7 flex flex-col justify-between h-full">
                <div>
                  <span className="text-3xl mb-4 block">⚡</span>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{t.philosophy.p2Title}</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    {t.philosophy.p2Desc}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 mt-4 block font-semibold">Speed &amp; UX</span>
              </div>
            </div>

            <div className="border-beam-card group">
              <div className="border-beam-inner p-7 flex flex-col justify-between h-full">
                <div>
                  <span className="text-3xl mb-4 block">🛡️</span>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{t.philosophy.p3Title}</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    {t.philosophy.p3Desc}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 mt-4 block font-semibold">Data Integrity</span>
              </div>
            </div>

            <div className="border-beam-card group">
              <div className="border-beam-inner p-7 flex flex-col justify-between h-full">
                <div>
                  <span className="text-3xl mb-4 block">🚀</span>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{t.philosophy.p4Title}</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    {t.philosophy.p4Desc}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 mt-4 block font-semibold">CI/CD &amp; Testing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FORMACIÓN ACADÉMICA */}
      <section id="formacion" className="py-20 md:py-24 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-[#0B0C0E]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              {t.education.title}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              {t.education.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Título Universitario: Ingeniero en Informática (UNSTA) */}
            <div className="border-beam-card group">
              <div className="border-beam-inner p-8 sm:p-9 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-100 dark:bg-amber-950/80 text-[#D97706] dark:text-[#FBBF24]">
                      {t.education.d1Badge}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>{t.education.d1Status}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
                    {t.education.d1Title}
                  </h3>
                  <p className="text-sm font-semibold text-[#D97706] dark:text-[#FBBF24] mt-1 mb-3">
                    {t.education.d1School}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                    {t.education.d1Desc}
                  </p>

                  <ul className="text-xs text-zinc-600 dark:text-zinc-300 space-y-1.5 font-normal border-t border-zinc-100 dark:border-zinc-800/60 pt-3">
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">▹</span>
                      <span>{t.education.d1Bullet1}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">▹</span>
                      <span>{t.education.d1Bullet2}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">▹</span>
                      <span>{t.education.d1Bullet3}</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>{t.education.d1FootLeft}</span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">{t.education.d1FootRight}</span>
                </div>
              </div>
            </div>

            {/* 2. Título Secundario: Técnico Electromecánico (Escuela Técnica N°1 de Monteros) */}
            <div className="border-beam-card group">
              <div className="border-beam-inner p-8 sm:p-9 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {t.education.d2Badge}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60 text-xs font-bold">
                      <span>{t.education.d2Status}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
                    {t.education.d2Title}
                  </h3>
                  <p className="text-sm font-semibold text-[#D97706] dark:text-[#FBBF24] mt-1 mb-3">
                    {t.education.d2School}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                    {t.education.d2Desc}
                  </p>

                  <ul className="text-xs text-zinc-600 dark:text-zinc-300 space-y-1.5 font-normal border-t border-zinc-100 dark:border-zinc-800/60 pt-3">
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">▹</span>
                      <span>{t.education.d2Bullet1}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">▹</span>
                      <span>{t.education.d2Bullet2}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">▹</span>
                      <span>{t.education.d2Bullet3}</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>{t.education.d2FootLeft}</span>
                  <span className="text-zinc-500 dark:text-zinc-400 font-semibold">{t.education.d2FootRight}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. CONTACTO & FOOTER */}
      <footer id="contacto" className="py-20 md:py-28 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="border-beam-card group">
            <div className="border-beam-inner p-8 sm:p-14 lg:p-16 flex flex-col items-center text-center">
              
              {/* Ilustración 3D generada por IA para la sección de contacto */}
              <div className="w-56 sm:w-64 md:w-72 max-w-full mb-6 relative group/illus">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-orange-500/10 rounded-3xl blur-2xl opacity-60 group-hover/illus:opacity-100 transition-opacity"></div>
                <img 
                  src="contact-illustration.png" 
                  alt="Ilustración 3D de ingeniería y colaboración" 
                  className="w-full h-auto object-contain relative z-10 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500" 
                  loading="lazy" 
                />
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-2xl">
                {t.contact.title}
              </h2>

              <p className="text-base text-zinc-600 dark:text-zinc-300 mt-4 max-w-xl leading-relaxed">
                {t.contact.desc}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-8 py-4 rounded-full bg-[#D97706] hover:bg-[#F59E0B] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
                >
                  <span>{t.contact.whatsapp}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>

                <a 
                  href={`mailto:${email}`} 
                  className="px-7 py-4 rounded-full border border-zinc-300 dark:border-zinc-700 hover:border-zinc-500 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-sm transition-all shadow-sm inline-flex items-center gap-2"
                >
                  <span>{t.contact.email}</span>
                </a>
              </div>

              <div className="mt-14 pt-8 border-t border-zinc-200/60 dark:border-zinc-800/60 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 gap-4">
                <p>{t.contact.copyRight}</p>
                <div className="flex items-center gap-6">
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">GitHub</a>
                  <a href={cvUrl} download="CV-Nicolas-Espinoza-Ingeniero.pdf" className="hover:text-amber-500 transition-colors">{t.contact.downloadCv}</a>
                  <a href="#" className="hover:text-amber-500 transition-colors">{t.contact.backToTop}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
});

PortfolioComponent.displayName = 'PortfolioComponent';
export default PortfolioComponent;
