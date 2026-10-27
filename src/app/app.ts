import { Component, signal, OnInit, AfterViewInit, HostListener, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  screenshot: string;
  tags: string[];
  status: string;
  category: string;
}

export interface TechItem {
  name: string;
  category: string;
  iconSvg: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {
  isDarkMode = signal<boolean>(false);
  copied = signal<boolean>(false);
  scrollProgress = signal<number>(0);
  modelOrbit = signal<string>('0deg 75deg 2.8m');
  show3DCompanion = signal<boolean>(true);

  // Información personal actualizada
  name = 'José Nicolás Espinoza Perillo';
  shortName = 'Nicolás Espinoza';
  titleDegree = 'Ingeniero en Informática';
  role = 'Ingeniero en Informática & Full Stack Developer';
  graduationStatus = 'Graduado 2026 · Universidad del Norte Santo Tomás de Aquino (UNSTA)';
  location = 'Monteros, Tucumán, Argentina';
  githubUrl = 'https://github.com/JNicoEP';
  email = 'nespinoza912@gmail.com';
  phone = '+54 9 3863567732';
  whatsappUrl = 'https://wa.me/5493863567732?text=Hola%20Nicolas,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar.';

  // Proyectos con capturas de pantalla reales (side-by-side)
  projects: Project[] = [
    {
      id: '01',
      title: 'Luvanna',
      subtitle: 'Plataforma Web de Streaming de Películas',
      description: 'Plataforma audiovisual moderna para explorar y reproducir películas con diseño cinematográfico inmersivo. Desarrollada con React y TypeScript, incluye catálogo dinámico clasificado por géneros, buscador en tiempo real y reproductor multimedia responsivo.',
      link: 'https://luvanna.netlify.app/',
      screenshot: 'projects/luvanna.png',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Streaming API', 'SPA'],
      status: 'EN VIVO',
      category: 'Multimedia & Streaming'
    },
    {
      id: '02',
      title: 'Escuela Mariano Ariza',
      subtitle: 'Sistema Institucional con BD & Aula Virtual con Roles',
      description: 'Sistema web integral para digitalizar la gestión escolar de la institución. Cuenta con arquitectura de base de datos relacional y autenticación con control de roles (directivos, docentes y alumnos), infografía escolar interactiva y repositorio descargable de documentación.',
      link: 'https://escuela-mariano-ariza-rust.vercel.app/',
      screenshot: 'projects/mariano-ariza.png',
      tags: ['JavaScript', 'PostgreSQL', 'Supabase', 'Vercel', 'RBAC'],
      status: 'PRODUCCIÓN',
      category: 'Gestión Educativa & Roles'
    },
    {
      id: '03',
      title: 'Lumière Studio',
      subtitle: 'Sistema Integral para Centro de Peluquería & Estética',
      description: 'Plataforma web con diseño editorial y minimalista concebida para salones de belleza y peluquería de autor. Integra catálogo interactivo de servicios estéticos, módulo dinámico de agenda y reserva de turnos online en tiempo real, cotizador y perfiles profesionales.',
      link: 'https://lumiiere.vercel.app/',
      screenshot: 'projects/lumiiere.png',
      tags: ['Angular', 'TypeScript', 'Tailwind CSS', 'Booking Engine', 'Responsive UI'],
      status: 'EN VIVO',
      category: 'Turnos Online & Estética'
    }
  ];

  // Competencias técnicas representadas con imágenes vectoriales (SVGs) oficiales
  technologies: TechItem[] = [
    {
      name: 'Python',
      category: 'Lenguaje',
      iconSvg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
    },
    {
      name: 'C++',
      category: 'Lenguaje',
      iconSvg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg'
    },
    {
      name: 'C',
      category: 'Lenguaje',
      iconSvg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg'
    },
    {
      name: 'JavaScript',
      category: 'Lenguaje',
      iconSvg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
    },
    {
      name: 'TypeScript',
      category: 'Lenguaje',
      iconSvg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
    },
    {
      name: 'Angular',
      category: 'Framework',
      iconSvg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg'
    },
    {
      name: 'React',
      category: 'Biblioteca UI',
      iconSvg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    },
    {
      name: 'PostgreSQL',
      category: 'Base de Datos',
      iconSvg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
    },
    {
      name: 'Supabase',
      category: 'BaaS / DB',
      iconSvg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg'
    },
    {
      name: 'Tailwind CSS',
      category: 'Estilos / UI',
      iconSvg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'
    },
    {
      name: 'HTML5',
      category: 'Estructura Web',
      iconSvg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
    },
    {
      name: 'CSS3',
      category: 'Estilos Web',
      iconSvg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
    },
    {
      name: 'Git',
      category: 'Control de Versiones',
      iconSvg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
    }
  ];

  ngOnInit() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.isDarkMode.set(true);
      document.documentElement.classList.add('dark');
    }
  }

  ngAfterViewInit() {
    this.setupScrollAnimations();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const progress = Math.min(Math.max(window.scrollY / docHeight, 0), 1);
      this.scrollProgress.set(progress);
      
      // Rotación suave del modelo 3D según el avance del scroll
      const deg = Math.round(progress * 360 * 1.5);
      const elevation = Math.round(60 + Math.sin(progress * Math.PI) * 20);
      this.modelOrbit.set(`${deg}deg ${elevation}deg 2.7m`);
    }
  }

  setupScrollAnimations() {
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      document.querySelectorAll('.fade-in-up').forEach((el) => {
        observer.observe(el);
      });
    } else {
      // Fallback
      document.querySelectorAll('.fade-in-up').forEach((el) => {
        el.classList.add('visible');
      });
    }
  }

  toggleTheme() {
    this.isDarkMode.update((v) => !v);
    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggle3D() {
    this.show3DCompanion.update((v) => !v);
  }

  copyEmail() {
    navigator.clipboard.writeText(this.email).then(() => {
      this.copied.set(true);
      setTimeout(() => {
        this.copied.set(false);
      }, 2500);
    });
  }
}
