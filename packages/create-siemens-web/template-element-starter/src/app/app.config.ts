import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  provideMissingTranslationHandlerForElement,
  provideNgxTranslateForElement,
} from '@siemens/element-translate-ng/ngx-translate';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withHashLocation()),
    provideBrowserGlobalErrorListeners(),
    provideNgxTranslateForElement(),
    provideTranslateService({
      missingTranslationHandler: provideMissingTranslationHandlerForElement(),
    }),
    provideTranslateHttpLoader({ prefix: 'assets/i18n/', suffix: '.json' }),
  ],
};
