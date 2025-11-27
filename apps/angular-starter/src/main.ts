import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environments';
import { getIxTheme } from '@siemens/ix-aggrid';
import * as agGrid from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

function setupAGGrid() {
  ModuleRegistry.registerModules([AllCommunityModule]);

  const ixTheme = getIxTheme(agGrid);
  agGrid.provideGlobalGridOptions({
    theme: ixTheme,
  });
}

setupAGGrid();

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);

// Dynamically load the corporate theme if present
// Only needed for deployments of demo
function optionalTheme() {
  if (environment.BRAND_THEME) {
    const baseHref = document.querySelector('base')?.href || '/';
    const css = `${baseHref}assets/theme/dist/css/brand-theme.css`;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = css;
    document.head.appendChild(link);
    const loader = `${baseHref}assets/theme/dist/index.js`;
    const script = document.createElement('script');
    script.src = loader;
    script.type = 'module';
    document.head.appendChild(script);
    document.documentElement.setAttribute('data-ix-theme', 'brand');
    document.documentElement.setAttribute('data-ix-color-schema', 'dark');
  }
}

optionalTheme();
