import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactBridgeComponent } from './bridges/react-bridge.component';
import type { ProjectContract, TechItemContract } from '../packages/portfolio-react';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactBridgeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  isDarkMode = signal<boolean>(false);
  language = signal<'es' | 'en'>('es');
  copied = signal<boolean>(false);

  // Información personal
  name = 'José Nicolás Espinoza Perillo';
  shortName = 'Nicolás Espinoza';
  titleDegree = 'Ingeniero en Informática';
  role = 'Ingeniero en Informática & Full Stack Developer';
  graduationStatus = 'Egresado 2026 · Universidad del Norte Santo Tomás de Aquino (UNSTA)';
  location = 'Monteros, Tucumán, Argentina';
  githubUrl = 'https://github.com/JNicoEP';
  email = 'nespinoza912@gmail.com';
  phone = '+54 9 3863567732';
  whatsappUrl = 'https://wa.me/5493863567732?text=Hola%20Nicolas,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar.';
  cvUrl = 'cv-nicolas-espinoza.pdf';

  // Proyectos destacados (Tipados bajo contrato estricto de microfrontends)
  projects: readonly ProjectContract[] = [
    {
      id: '01',
      title: 'Escuela Mariano Ariza',
      subtitle: 'Sistema Institucional con BD & Aula Virtual con Roles',
      description: 'Sistema web integral para digitalizar la gestión escolar de la institución. Cuenta con arquitectura de base de datos relacional y autenticación con control de roles (directivos, docentes y alumnos), infografía escolar interactiva, proyectos estudiantiles y repositorio descargable de documentación.',
      link: 'https://escuela-mariano-ariza-rust.vercel.app/',
      screenshot: 'projects/mariano-ariza.png',
      tags: ['JavaScript', 'PostgreSQL', 'Supabase', 'Vercel', 'RBAC'],
      status: 'EN LÍNEA',
      category: 'Gestión Educativa & Roles'
    },
    {
      id: '02',
      title: 'Luvanna',
      subtitle: 'Plataforma Web de Streaming de Películas',
      description: 'Plataforma audiovisual moderna para explorar y reproducir películas con diseño cinematográfico inmersivo. Desarrollada con React y TypeScript, incluye catálogo interactivo clasificado por géneros y tendencias, buscador en tiempo real y reproductor multimedia fluido.',
      link: 'https://luvanna.netlify.app/',
      screenshot: 'projects/luvanna.png',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Streaming API', 'SPA'],
      status: 'EN LÍNEA',
      category: 'Multimedia & Streaming'
    },
    {
      id: '03',
      title: 'Lumiere',
      subtitle: 'Sistema Integral para Centro de Peluquería & Estética',
      description: 'Plataforma web con diseño editorial y minimalista para peluqueria. Integra catálogo interactivo de servicios estéticos, módulo dinámico de agenda y reserva de turnos online en tiempo real, cotizador y perfiles profesionales.',
      link: 'https://lumiiere.vercel.app/',
      screenshot: 'projects/lumiiere.png',
      tags: ['Angular', 'TypeScript', 'Tailwind CSS', 'Booking Engine', 'Responsive UI'],
      status: 'EN PROCESO',
      category: 'Turnos Online & Estética'
    }
  ];

  // Competencias técnicas organizadas en dos filas para desplazamiento continuo
  technologiesRow1: readonly TechItemContract[] = [
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
    }
  ];

  technologiesRow2: readonly TechItemContract[] = [
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

  toggleTheme() {
    this.isDarkMode.update((v) => !v);
    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleLanguage() {
    this.language.update((l) => (l === 'es' ? 'en' : 'es'));
  }

  onEmailCopied(email: string) {
    this.copied.set(true);
    setTimeout(() => {
      this.copied.set(false);
    }, 2500);
  }
}
