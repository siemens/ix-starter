import { CommonModule } from '@angular/common';
import { Component, ErrorHandler, ViewChild } from '@angular/core';
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
import { ErrorBoundaryComponent } from './../components/error-boundary/error-boundary.component';
import { GlobalErrorHandler } from './error-handler';

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
    ErrorBoundaryComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    @ViewChild(ErrorBoundaryComponent, { static: true }) boundary!: ErrorBoundaryComponent;
  protected readonly companyLogoComponent = CompanyLogoComponent;

  constructor(private router: Router, private errorHandler: ErrorHandler) {}

  ngOnInit() {
    (this.errorHandler as GlobalErrorHandler).registerBoundary(this.boundary);
  }

  isActiveRoute(path: string): boolean {
    if (path === '/') {
      return this.router.url === '/' || this.router.url === '';
    }
    return this.router.url === path || this.router.url.startsWith(path + '/');
  }
}
