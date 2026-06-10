import { Component, ErrorHandler, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IxApplication,
  IxApplicationHeader,
  IxAvatar,
  IxMenu,
  IxMenuItem,
  IxContent,
} from '@siemens/ix-angular/standalone';
import { ErrorBoundaryComponent } from './error-boundary.component';
import { GlobalErrorHandler } from './error-handler';
import { CompanyLogoComponent } from './company-logo.component';

@Component({
  selector: 'app-root',
  standalone: true,
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
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
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
