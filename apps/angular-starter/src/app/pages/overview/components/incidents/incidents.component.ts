import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncidentListComponent } from './incident-list/incident-list.component';
import {
  IxTypography,
  IxIcon,
  IxButton,
  IxInput,
} from '@siemens/ix-angular/standalone';
import { useShowDemoMessage } from '../../../../shared/utlis';
import {
  iconSearch,
  iconCardLayout,
  iconList,
  iconCloudUpload,
  iconMaintenanceWarning,
  iconInfo,
  iconError,
} from '@siemens/ix-icons/icons';
import { addIcons } from '@siemens/ix-icons';
import { TranslateModule } from '@ngx-translate/core';
import { INCIDENTS } from '../../../../../assets/mock-data/Incidents';

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [
    IxTypography,
    IxInput,
    IxIcon,
    IxButton,
    ReactiveFormsModule,
    IncidentListComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss'],
})
export class IncidentsComponent {
  searchText = '';
  readonly icons = {
    iconSearch,
    iconCardLayout,
    iconList,
    iconCloudUpload,
    iconMaintenanceWarning,
    iconInfo,
    iconError,
  };
  openModal() {
    useShowDemoMessage();
  }
  incidents = INCIDENTS;
  constructor() {
    addIcons({ iconSearch, iconCardLayout, iconList });
  }

  onSearch(event: any) {
    this.searchText = event.target.value;
  }
}
