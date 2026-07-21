import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  SiApplicationHeaderComponent,
  SiHeaderAccountItemComponent,
  SiHeaderActionsDirective,
  SiHeaderBrandDirective,
  SiHeaderLogoDirective
} from '@siemens/element-ng/application-header';
import { SiCardComponent } from '@siemens/element-ng/card';
import {
  SiHeaderDropdownComponent,
  SiHeaderDropdownItemComponent,
  SiHeaderDropdownTriggerDirective
} from '@siemens/element-ng/header-dropdown';
import { SiLanguageSwitcherComponent } from '@siemens/element-ng/language-switcher';
import { ThemeType } from '@siemens/element-ng/theme';

import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-home',
  imports: [
    SiApplicationHeaderComponent,
    SiHeaderDropdownComponent,
    SiHeaderDropdownItemComponent,
    SiHeaderDropdownTriggerDirective,
    SiHeaderLogoDirective,
    SiHeaderBrandDirective,
    SiHeaderAccountItemComponent,
    SiHeaderActionsDirective,
    SiCardComponent,
    RouterLink,
    SiLanguageSwitcherComponent,
    TranslatePipe
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  host: {
    class: 'si-layout-inner'
  }
})
export class Home {
  private settingsService = inject(SettingsService);

  readonly languageItems = this.settingsService.availableLanguages.map((language) => ({
    key: language,
    label: `LANGUAGE.${language.toUpperCase()}`
  }));

  switchLanguage(language: string) {
    this.settingsService.setLanguage(language);
  }

  switchTheme(theme: string) {
    this.settingsService.setTheme(theme as ThemeType);
  }

  getTheme(): ThemeType {
    return this.settingsService.theme;
  }

  getLanguage(): string {
    return this.settingsService.language;
  }

}
