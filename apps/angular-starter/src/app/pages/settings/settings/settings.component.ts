import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  IxRadio,
  IxRadioGroup,
  IxTypography,
} from '@siemens/ix-angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { useShowDemoMessage } from '../../../shared/utlis';
import { SharedService } from '../../../shared/services/shared.service';
import { environment } from '../../../../environments/environment';
import { themeSwitcher } from '@siemens/ix';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  imports: [IxTypography, IxRadio, IxRadioGroup, TranslateModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit, OnDestroy {
  selectedThemeVariant = 'theme-classic';
  currentLang = 'en';
  isProdMode = false;
  private readonly sharedService = inject(SharedService);

  private languageChangeDisposable?: Subscription;

  ngOnInit() {
    this.isProdMode = environment.BRAND_THEME;
    this.languageChangeDisposable = this.sharedService.currentLang$.subscribe(
      (lang) => {
        this.currentLang = lang;
      },
    );
  }

  ngOnDestroy(): void {
    this.languageChangeDisposable?.unsubscribe();
  }

  switchLanguage(lang: string) {
    this.sharedService.setLanguage(lang);
  }

  onThemeChange(selectedThemeVariant: string) {
    if (environment.BRAND_THEME) {
      const currenttheme = themeSwitcher.getCurrentTheme();
      const newTheme = currenttheme.includes('light')
        ? selectedThemeVariant + '-light'
        : selectedThemeVariant + '-dark';
      themeSwitcher.setTheme(newTheme);

      this.selectedThemeVariant = selectedThemeVariant;
    } else {
      useShowDemoMessage();
    }
  }
}
