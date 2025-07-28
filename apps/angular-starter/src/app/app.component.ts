import { Component, inject, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import {
  IxApplication,
  IxApplicationHeader,
  IxAvatar,
  IxDropdownItem,
  IxMenu,
  IxMenuItem,
  IxMenuSettingsItem,
  IxMenuSettings,
  IxTypography,
  IxToggle,
  IxUpload,
} from '@siemens/ix-angular/standalone';
import { addIcons } from '@siemens/ix-icons';
import {
  iconStar,
  iconStarFilled,
  iconHome,
  iconProject,
  iconUserSettings,
  iconLogOut,
} from '@siemens/ix-icons/icons';
import { useShowDemoMessage } from './shared/utlis';
import { SettingsComponent } from './pages/settings/settings/settings.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { themeSwitcher } from '@siemens/ix';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IxApplication,
    IxApplicationHeader,
    IxMenu,
    IxMenuItem,
    IxAvatar,
    IxDropdownItem,
    IxMenuSettingsItem,
    IxMenuSettings,
    RouterOutlet,
    RouterLink,
    IxTypography,
    IxToggle,
    IxUpload,
    SettingsComponent,
    TranslateModule,
  ],
  templateUrl: './app.component.html',

  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  activePage = 'overview';
  activeSettingsTab = 'user-settings'; // Track active settings tab
  private readonly router = inject(Router);
  private readonly translateService = inject(TranslateService);
  constructor() {
    addIcons({
      iconStar,
      iconStarFilled,
      iconHome,
      iconProject,
      iconUserSettings,
      iconLogOut,
    });
  }

  ngOnInit() {
    themeSwitcher.setTheme('theme-classic-dark');
    this.setActivePageFromUrl(this.router.url);
    // Listen to route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setActivePageFromUrl(event.url);
      });

    // Ensure the first tab is active by default
    this.activeSettingsTab = 'user-settings';
  }

  private setActivePageFromUrl(url: string) {
    if (url.includes('devices')) {
      this.activePage = 'devices';
    } else if (url.includes('overview')) {
      this.activePage = 'overview';
    }
  }

  openModal() {
    useShowDemoMessage();
  }

  setActiveSettingsTab(event: any) {
    const selectedLabel = event.detail;

    const userSettingsLabel = this.translateService.instant('settings.user-settings');
    const appSettingsLabel = this.translateService.instant('settings.application-settings');

    if (selectedLabel === userSettingsLabel) {
      this.activeSettingsTab = 'user-settings';
    } else if (selectedLabel === appSettingsLabel) {
      this.activeSettingsTab = 'application-settings';
    }
  }
}
