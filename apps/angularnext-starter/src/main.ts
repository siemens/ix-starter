import { bootstrapApplication } from '@angular/platform-browser';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { registerTheme } from '@siemens/ix-echarts';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { addIcons } from '@siemens/ix-icons';
import { iconHome, iconPiechart, iconTextDocument, iconTable, iconQuestion } from '@siemens/ix-icons/icons';
import { themeSwitcher } from '@siemens/ix';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';

addIcons({ iconHome, iconPiechart, iconTextDocument, iconTable, iconQuestion });

echarts.use([LineChart, GridComponent, TooltipComponent, TitleComponent, LegendComponent, CanvasRenderer]);
registerTheme(echarts);
ModuleRegistry.registerModules([AllCommunityModule]);

function optionalTheme(): void {
  if (environment.BRAND_THEME) {
    const baseHref = document.querySelector('base')?.href ?? '/';
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${baseHref}assets/theme/dist/css/brand-theme.css`;
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = `${baseHref}assets/theme/dist/index.js`;
    script.type = 'module';
    document.head.appendChild(script);
    themeSwitcher.setTheme('brand', 'dark');
  } else {
    themeSwitcher.setTheme('classic', 'dark');
  }
}
optionalTheme();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
