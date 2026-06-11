import { themeSwitcher } from '@siemens/ix';
import { registerTheme } from '@siemens/ix-echarts';
import { addIcons } from '@siemens/ix-icons';
import {
  iconHome,
  iconPiechart,
  iconQuestion,
  iconTable,
  iconTextDocument,
} from '@siemens/ix-icons/icons';
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
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import '@siemens/ix/dist/siemens-ix/siemens-ix.css';

addIcons({ iconHome, iconPiechart, iconQuestion, iconTable, iconTextDocument });
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

function optionalTheme(): void {
  if (import.meta.env.VITE_THEME) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${import.meta.env.BASE_URL}theme/dist/css/brand-theme.css`;
    document.head.append(link);
    const script = document.createElement('script');
    script.src = `${import.meta.env.BASE_URL}theme/dist/index.js`;
    script.type = 'module';
    document.head.append(script);
    themeSwitcher.setTheme('brand', 'dark');
  } else {
    themeSwitcher.setTheme('classic', 'dark');
  }
}
optionalTheme();

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
