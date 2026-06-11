import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly companyLogoComponent = CompanyLogoComponent;
  constructor(private router: Router) {}

  isActiveRoute(path: string): boolean {
    if (path === '/') {
      return this.router.url === '/' || this.router.url === '';
    }
    return this.router.url === path || this.router.url.startsWith(path + '/');
  }
}
