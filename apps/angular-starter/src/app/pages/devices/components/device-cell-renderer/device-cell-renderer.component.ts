import { Component } from '@angular/core';
import { IxIcon, IxRow, IxTypography } from '@siemens/ix-angular/standalone';
import { addIcons } from '@siemens/ix-icons';
import { iconSuccess } from '@siemens/ix-icons/icons';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-device-cell-renderer',
  imports: [IxRow, IxTypography, IxIcon],
  standalone: true,
  templateUrl: './device-cell-renderer.component.html',
  styleUrl: './device-cell-renderer.component.scss'
})
export class DeviceCellRendererComponent implements ICellRendererAngularComp {
  params: any;
  iconName = "success";
  iconColor = "color-success";
  status = "Online";

  constructor() {
    addIcons({
      iconSuccess,
    });
  }

  agInit(params: any): void {
    this.status = params.data.status;

    switch (params.data.status) {
      case "Online":
        this.iconName = "success";
        this.iconColor = "color-success";
        break;
      case "Offline":
        this.iconName = "info";
        this.iconColor = "";
        break;
      case "Maintenance":
        this.iconName = "maintenance-warning";
        this.iconColor = "color-warning";
        break;
      default:
        this.iconName = "error";
        this.iconColor = "color-alarm";
        break;
    }
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }
}
