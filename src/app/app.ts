import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  tags: string[];
  status: string;
  metric: string;
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
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  isDarkMode = signal<boolean>(false);
  copied = signal<boolean>(false);

  // Datos personales
  name = 'José Nicolás Espinoza Perillo';
  shortName = 'Nicolás Espinoza';
  role = 'Software Engineer & Full Stack Developer';
  education = 'Estudiante avanzado de Ingeniería en Informática (5° año - UNSTA)';
  location = 'Monteros, Tucumán, Argentina';
  githubUrl = 'https://github.com/JNicoEP';
  email = 'nespinoza912@gmail.com';
  phone = '+54 9 3863567732';
  whatsappUrl = 'https://wa.me/5493863567732?text=Hola%20Nicolas,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar.';

  // Proyectos destacados con enlaces actualizados
  projects: Project[] = [
    {
      id: '01',
      title: 'Luvanna',
      subtitle: 'Plataforma Web de Streaming de Películas',
      description: 'Plataforma para ver y explorar películas con interfaz cinematográfica de alto impacto. Cuenta con catálogo interactivo clasificado por géneros, reproductor multimedia responsivo y experiencia de usuario fluida.',
      link: 'https://luvanna.netlify.app/',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Streaming API'],
      status: 'EN LÍNEA',
      metric: 'Web App'
    },
    {
      id: '02',
      title: 'Escuela Mariano Ariza',
      subtitle: 'Sistema Institucional con BD & Aula Virtual con Roles',
      description: 'Sistema web integral diseñado para digitalizar la gestión escolar. Incorpora arquitectura de base de datos relacional con roles diferenciados para directivos, docentes y alumnos, infografía de la institución y repositorio descargable de documentación.',
      link: 'https://escuela-mariano-ariza-rust.vercel.app/',
      tags: ['JavaScript', 'PostgreSQL', 'Supabase', 'Vercel', 'RBAC'],
      status: 'PRODUCCIÓN',
      metric: 'Gestión & Roles'
    },
    {
      id: '03',
      title: 'Lumière Studio',
      subtitle: 'Sistema Integral para Centro de Peluquería & Estética',
      description: 'Plataforma web con diseño minimalista para salón de belleza y peluquería. Incluye catálogo interactivo de servicios, módulo de agenda y reserva de turnos online en tiempo real, perfiles de estilistas y cotizaciones.',
      link: 'https://lumiiere.vercel.app/',
      tags: ['Angular', 'TypeScript', 'Tailwind CSS', 'Booking System'],
      status: 'EN LÍNEA',
      metric: 'Sistema de Turnos'
    }
  ];

  // Competencias técnicas representadas con imágenes vectoriales (SVGs) oficiales
  technologies: TechItem[] = [
    {
      name: 'Python',
      category: 'Lenguaje',
      iconSvg: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg`
    },
    {
      name: 'C++',
      category: 'Lenguaje',
      iconSvg: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg`
    },
    {
      name: 'C',
      category: 'Lenguaje',
      iconSvg: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg`
    },
    {
      name: 'JavaScript',
      category: 'Lenguaje',
      iconSvg: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg`
    },
    {
      name: 'TypeScript',
      category: 'Lenguaje',
      iconSvg: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg`
    },
    {
      name: 'Angular',
      category: 'Framework',
      iconSvg: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg`
    },
    {
      name: 'React',
      category: 'Biblioteca UI',
      iconSvg: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg`
    },
    {
      name: 'PostgreSQL',
      category: 'Base de Datos',
      iconSvg: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg`
    },
    {
      name: 'Supabase',
      category: 'BaaS / DB',
      iconSvg: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg`
    },
    {
      name: 'Tailwind CSS',
      category: 'Estilos / CSS',
      iconSvg: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg`
    },
    {
      name: 'HTML5',
      category: 'Estructura Web',
      iconSvg: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg`
    },
    {
      name: 'CSS3',
      category: 'Estilos Web',
      iconSvg: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg`
    },
    {
      name: 'Git',
      category: 'Control de Versiones',
      iconSvg: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg`
    }
  ];

  ngOnInit() {
    // Detectar preferencia del sistema para modo oscuro
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.isDarkMode.set(true);
      document.documentElement.classList.add('dark');
    }
  }

  toggleTheme() {
    this.isDarkMode.update(v => !v);
    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
