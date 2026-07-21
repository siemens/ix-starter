import { inject, Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { SiThemeService, ThemeType } from '@siemens/element-ng/theme';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private translate = inject(TranslateService);
  private themeService = inject(SiThemeService);
  readonly availableLanguages = ['en', 'de'];

  constructor() {
    this.translate.setDefaultLang('en');
    this.translate.onLangChange.subscribe(this.storeLanguage);

    const language = this.loadLanguage() ?? this.translate.getBrowserLang() ?? 'en';
    this.setLanguage(language);

    this.setTheme(this.loadTheme() ?? 'auto');
  }

  get language() {
    return this.translate.currentLang;
  }

  get theme() {
    return this.loadTheme() ?? 'auto';
  }

  setLanguage(language: string) {
    if (this.availableLanguages.includes(language)) {
      this.translate.use(language);
    }
  }

  setTheme(theme: ThemeType) {
    this.themeService.applyThemeType(theme);
    this.storeTheme(theme);
  }

  private storeLanguage(event: LangChangeEvent) {
    localStorage.setItem('lang', event.lang);
  }

  private storeTheme(theme: ThemeType) {
    localStorage.setItem('theme', theme);
  }

  private loadLanguage() {
    return localStorage.getItem('lang');
  }

  private loadTheme() {
    return localStorage.getItem('theme') as ThemeType | undefined;
  }
}
