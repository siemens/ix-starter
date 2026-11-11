import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { registerTheme } from '@siemens/ix-echarts';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

import '@siemens/ix/dist/siemens-ix/siemens-ix.css';
import './styles/global.css';

import App from './App.vue';

echarts.use([LineChart, GridComponent, TooltipComponent, TitleComponent, LegendComponent, CanvasRenderer]);
registerTheme(echarts);
ModuleRegistry.registerModules([AllCommunityModule]);

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('./pages/get-started/GetStarted.vue') },
    { path: '/forms', component: () => import('./pages/forms/FormsPage.vue') },
    { path: '/charts', component: () => import('./pages/charts/ChartsPage.vue') },
    { path: '/grids', component: () => import('./pages/grids/GridsPage.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
});

const app = createApp(App);

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue error:', err);
  console.error('Component:', instance);
  console.error('Info:', info);
};

app.use(router);

app.mount('#app');
