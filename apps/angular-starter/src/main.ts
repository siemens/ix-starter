

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environments';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

// Dynamically load the corporate theme if present
function optionalTheme() {
  if (environment.CORPORATE_THEME_ENABLED) {
    const css = `${environment.BASE_HREF}assets/theme/dist/css/brand-theme.css`;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = css;
    document.head.appendChild(link);

    const loader = `${environment.BASE_HREF}assets/theme/dist/index.js`;
    const script = document.createElement('script');
    script.src = loader;
    script.type = 'module';
    document.head.appendChild(script);

    document.body.classList.add('theme-brand-dark');
  }
}

optionalTheme();


