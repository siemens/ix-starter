import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideSiUiState } from '@siemens/element-ng/common';
import { provideSiDatatableConfig } from '@siemens/element-ng/datatable';
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
    provideSiDatatableConfig(),
    provideTranslateService({
      missingTranslationHandler: provideMissingTranslationHandlerForElement(),
    }),
    provideTranslateHttpLoader({ prefix: 'assets/i18n/', suffix: '.json' }),
    provideSiUiState(),
  ],
};
