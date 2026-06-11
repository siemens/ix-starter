import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { registerTheme } from '@siemens/ix-echarts';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { addIcons } from '@siemens/ix-icons';
import {
  iconHome,
  iconPiechart,
  iconTextDocument,
  iconTable,
  iconQuestion,
} from '@siemens/ix-icons/icons';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';

import '@siemens/ix/dist/siemens-ix/siemens-ix.css';

addIcons({ iconHome, iconPiechart, iconTextDocument, iconTable, iconQuestion });
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
