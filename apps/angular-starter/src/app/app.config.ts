import { ApplicationConfig, provideZoneChangeDetection, ErrorHandler } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { GlobalErrorHandler } from './error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
};
