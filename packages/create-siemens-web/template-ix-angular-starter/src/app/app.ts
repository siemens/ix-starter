import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {
  IxApplication,
  IxApplicationHeader,
  IxAvatar,
  IxContent,
  IxMenu,
  IxMenuItem,
} from '@siemens/ix-angular/standalone';
import { CompanyLogoComponent } from './../components/company-logo/company-logo.component';
import { iconHome, iconPiechart, iconTable, iconTextDocument } from '@siemens/ix-icons/icons';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    IxApplication,
    IxApplicationHeader,
    IxAvatar,
    IxMenu,
    IxMenuItem,
    IxContent,
    CompanyLogoComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);

  readonly icons = {
    iconHome,
    iconTextDocument,
    iconPiechart,
    iconTable,
  } as const;

  protected readonly showLogo = !window.customElements.get('ix-siemens-logo');

  isActiveRoute(path: string): boolean {
    if (path === '/') {
      return this.router.url === '/' || this.router.url === '';
    }
    return this.router.url === path || this.router.url.startsWith(path + '/');
  }
}
