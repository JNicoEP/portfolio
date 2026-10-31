import {
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  SimpleChanges,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import {
  PortfolioComponent,
  PortfolioBridgeProps,
  ProjectContract,
  TechItemContract,
} from '../../packages/portfolio-react';

@Component({
  selector: 'app-react-portfolio-bridge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #reactHost class="w-full min-h-screen"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactBridgeComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('reactHost', { static: true })
  private readonly hostRef!: ElementRef<HTMLDivElement>;

  @Input({ required: true }) isDarkMode!: boolean;
  @Input() language: 'es' | 'en' = 'es';
  @Input({ required: true }) projects!: readonly ProjectContract[];
  @Input({ required: true }) technologiesRow1!: readonly TechItemContract[];
  @Input({ required: true }) technologiesRow2!: readonly TechItemContract[];
  @Input({ required: true }) cvUrl!: string;
  @Input({ required: true }) githubUrl!: string;
  @Input({ required: true }) whatsappUrl!: string;
  @Input({ required: true }) email!: string;

  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleLanguage = new EventEmitter<void>();
  @Output() copyEmail = new EventEmitter<string>();

  private reactRoot: Root | null = null;

  ngAfterViewInit(): void {
    // Montaje del microfrontend de React en el contenedor DOM de Angular
    this.reactRoot = createRoot(this.hostRef.nativeElement);
    this.renderReact();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Sincronización reactiva de Inputs hacia Props
    if (this.reactRoot) {
      this.renderReact();
    }
  }

  private renderReact(): void {
    if (!this.reactRoot) return;

    const props: PortfolioBridgeProps = {
      isDarkMode: this.isDarkMode,
      onToggleTheme: () => this.toggleTheme.emit(),
      language: this.language,
      onToggleLanguage: () => this.toggleLanguage.emit(),
      projects: this.projects,
      technologiesRow1: this.technologiesRow1,
      technologiesRow2: this.technologiesRow2,
      cvUrl: this.cvUrl,
      githubUrl: this.githubUrl,
      whatsappUrl: this.whatsappUrl,
      email: this.email,
      onCopyEmail: (copied) => this.copyEmail.emit(copied),
    };

    this.reactRoot.render(React.createElement(PortfolioComponent, props));
  }

  ngOnDestroy(): void {
    // Desmontaje limpio para prevenir fugas de memoria y listeners activos
    if (this.reactRoot) {
      this.reactRoot.unmount();
      this.reactRoot = null;
    }
  }
}
