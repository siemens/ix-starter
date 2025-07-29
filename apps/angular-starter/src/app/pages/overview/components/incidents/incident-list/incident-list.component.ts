import { Component, Input, inject } from '@angular/core';
import {
  iconCloudUpload,
  iconMaintenanceWarning,
  iconInfo,
  iconError,
  iconOpenExternal,
  iconUpload,
} from '@siemens/ix-icons/icons';
import { addIcons } from '@siemens/ix-icons';
import {
  IxLayoutGrid,
  IxRow,
  IxCol,
  IxEventList,
  IxEventListItem,
  IxTypography,
  IxIcon,
  IxIconButton,
  IxButton,
} from '@siemens/ix-angular/standalone';
import { useShowDemoMessage } from '../../../../../shared/utlis';
import { TranslateModule } from '@ngx-translate/core';
import { MediaQueryService } from '../../../../../shared/services/media-query.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [
    IxLayoutGrid,
    IxRow,
    IxCol,
    IxEventList,
    IxEventListItem,
    IxTypography,
    IxIcon,
    IxIconButton,
    IxButton,
    TranslateModule,
    AsyncPipe,
  ],
  templateUrl: './incident-list.component.html',
  styleUrl: './incident-list.component.scss',
})
export class IncidentListComponent {
  @Input() incidents: any[] = [];
  @Input() search = '';

  public readonly mediaQueryService = inject(MediaQueryService);

  constructor() {
    addIcons({
      iconCloudUpload,
      iconMaintenanceWarning,
      iconInfo,
      iconError,
      iconOpenExternal,
      iconUpload,
    });
  }

  usemodal() {
    useShowDemoMessage();
  }
  get filteredIncidents() {
    const query = this.search.toLowerCase();
    return this.incidents.filter((incident) =>
      Object.values(incident).some(
        (value) =>
          typeof value === 'string' && value.toLowerCase().includes(query),
      ),
    );
  }
}
