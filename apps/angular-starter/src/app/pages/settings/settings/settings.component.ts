import { Component } from '@angular/core';
import {
  IxRadio,
  IxRadioGroup,
  IxTypography,
} from '@siemens/ix-angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { useShowDemoMessage } from '../../../shared/utlis';
import { SharedService } from '../../../shared/services/shared.service';
import { environment } from '../../../../environments/environments';
import { themeSwitcher } from '@siemens/ix';

@Component({
  selector: 'app-settings',
  imports: [IxTypography, IxRadio, IxRadioGroup, TranslateModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  selectedThemeVariant = 'theme-classic';
  currentLang: string = 'en';
  isProdMode: boolean = false;
  constructor(private readonly sharedService: SharedService) { }

  ngOnInit() {

    this.isProdMode = environment.BRAND_THEME;
    this.sharedService.currentLang$.subscribe((lang) => {
      this.currentLang = lang;
    });
  }

  switchLanguage(lang: string) {
    this.sharedService.setLanguage(lang);
  }

  onThemeChange(selectedThemeVariant: string) {
    if (environment.BRAND_THEME) {
      let currenttheme = themeSwitcher.getCurrentTheme();
      const newTheme = currenttheme.includes('light')
        ? selectedThemeVariant + '-light'
        : selectedThemeVariant + '-dark';
      themeSwitcher.setTheme(newTheme);

      this.selectedThemeVariant = selectedThemeVariant;
    }
    else {
      useShowDemoMessage();
    }
  }
}
