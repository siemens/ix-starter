import { bootstrapApplication } from '@angular/platform-browser';
import { registerTheme } from '@siemens/ix-echarts';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { App } from './app/app';
import { appConfig } from './app/app.config';

echarts.use([
  LineChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  CanvasRenderer,
]);
registerTheme(echarts);
ModuleRegistry.registerModules([AllCommunityModule]);

bootstrapApplication(App, appConfig).catch(err => console.error(err));
