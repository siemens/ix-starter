import { Component, isDevMode } from '@angular/core';
import {
  IxRadio,
  IxRadioGroup,
  IxTypography,
} from '@siemens/ix-angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { themeSwitcher } from '@siemens/ix';
import { useShowDemoMessage } from '../../../shared/utlis';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-settings',
  imports: [IxTypography, IxRadio, IxRadioGroup, TranslateModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  selectedThemeVariant = 'theme-classic';
  currentLang: string = 'en';
  isDevMode: boolean = true;
  constructor(private readonly sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.currentLang$.subscribe((lang) => {
      this.currentLang = lang;
    });

    this.isDevMode = isDevMode();
  }

  switchLanguage(lang: string) {
    this.sharedService.setLanguage(lang);
  }

  onThemeChange(selectedThemeVariant: string) {
    if (this.isDevMode) {
      let currenttheme = themeSwitcher.getCurrentTheme();
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
