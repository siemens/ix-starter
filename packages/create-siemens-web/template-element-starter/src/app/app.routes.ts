import { Routes } from '@angular/router';

import { Charts } from './pages/charts/charts';
import { Forms } from './pages/forms/forms';
import { GetStarted } from './pages/get-started/get-started';
import { Grids } from './pages/grids/grids';
import { Main } from './pages/main';

export const routes: Routes = [
  {
    path: 'main',
    component: Main,
    children: [
      { path: 'charts', component: Charts },
      { path: 'forms', component: Forms },
      { path: 'get-started', component: GetStarted },
      { path: 'grids', component: Grids },
      { path: '', redirectTo: 'get-started', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'main' },
];
