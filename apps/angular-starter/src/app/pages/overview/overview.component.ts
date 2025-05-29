import { Component } from '@angular/core';
import { IxContent, IxContentHeader } from '@siemens/ix-angular/standalone';
import { DeviceRangeComponent } from './components/device-range/device-range.component';
import { StatusHistoryComponent } from './components/status-history/status-history.component';
import { IncidentsComponent } from './components/incidents/incidents.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    IxContentHeader,
    DeviceRangeComponent,
    StatusHistoryComponent,
    IncidentsComponent,
    IxContent,
    TranslateModule,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  constructor() {}
}
