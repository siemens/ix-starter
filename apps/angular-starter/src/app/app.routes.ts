import { Routes } from '@angular/router';
import { GetStartedComponent } from './pages/get-started/get-started.component';
import { FormsComponent } from './pages/forms/forms.component';
import { ChartsComponent } from './pages/charts/charts.component';
import { GridsComponent } from './pages/grids/grids.component';

export const routes: Routes = [
  { path: '', component: GetStartedComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'charts', component: ChartsComponent },
  { path: 'grids', component: GridsComponent },
  { path: '**', redirectTo: '' },
];
