import { Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { DevicesComponent } from './pages/devices/devices.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: 'overview',
    component: OverviewComponent,
  },
  {
    path: 'devices',
    component: DevicesComponent,
  },
];
