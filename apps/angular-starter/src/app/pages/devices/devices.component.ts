import { Component, OnDestroy, ViewChild, OnInit, inject } from '@angular/core';
import {
  IxButton,
  IxCategoryFilter,
  IxChip,
  IxContent,
  IxContentHeader,
  IxDivider,
  IxEmptyState,
  IxPane,
  IxTypography,
} from '@siemens/ix-angular/standalone';
import { addIcons } from '@siemens/ix-icons';
import {
  iconAddCircle,
  iconError,
  iconInfo,
  iconMaintenanceWarning,
  iconPen,
  iconProject,
  iconSuccess,
  iconTrashcan,
  iconWarning,
} from '@siemens/ix-icons/icons';
import { ActionCellRendererComponent } from './components/action-cell-renderer/action-cell-renderer.component';
import { AgGridAngular } from 'ag-grid-angular';
import { IRowNode } from 'ag-grid-community';
import { ModalService, showMessage } from '@siemens/ix-angular';
import { AddDeviceModelComponent } from './components/add-device-model/add-device-model.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { CopiedDataOperType, DeviceData } from '../../shared/models/types';
import { DEVICE_DATA } from '../../../assets/mock-data/device';
import { convertToSentenceCase } from '../../shared/utlis';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../../shared/services/shared.service';
import { DeviceCellRendererComponent } from './components/device-cell-renderer/device-cell-renderer.component';

@Component({
  selector: 'app-devices',
  imports: [
    IxContentHeader,
    IxButton,
    AgGridAngular,
    IxPane,
    IxTypography,
    IxDivider,
    IxChip,
    IxCategoryFilter,
    IxContent,
    IxButton,
    ReactiveFormsModule,
    TranslateModule,
    IxEmptyState,
  ],
  standalone: true,
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss',
})
export class DevicesComponent implements OnDestroy, OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  isStatusUpdateInProgress = false;
  expanded = false;
  selectedRow: any = {};
  selectedRowEntries: any = [];
  filterText = '';
  columnDefs: any[] = [];
  destroy$ = new Subject();
  rowData: DeviceData[] = DEVICE_DATA;
  statusCount: any = {};
  canPaste = false;
  isFilterRowEmpty = false;

  categories = {
    deviceName: {
      label: 'Device Name',
      options: [...new Set(this.rowData.map((item: any) => item.deviceName))],
    },
    vendor: {
      label: 'Vendor',
      options: [...new Set(this.rowData.map((item: any) => item.vendor))],
    },
    description: {
      label: 'Device Type',
      options: [...new Set(this.rowData.map((item: any) => item.description))],
    },
    status: {
      label: 'Status',
      options: [...new Set(this.rowData.map((item: any) => item.status))],
    },
    ipAddress: {
      label: 'IP Address',
      options: [...new Set(this.rowData.map((item: any) => item.ipAddress))],
    },
  };

  get filterState() {
    return this._filterState;
  }

  _filterState: { tokens: string[]; categories: any } = {
    tokens: [''],
    categories: [],
  };

  private readonly modalService = inject(ModalService);
  private readonly sharedService = inject(SharedService);
  private readonly translate = inject(TranslateService);

  constructor(
  ) {
    this.setColumnDefs();
    addIcons({
      iconAddCircle,
      iconSuccess,
      iconInfo,
      iconMaintenanceWarning,
      iconError,
      iconPen,
      iconTrashcan,
      iconProject,
      iconWarning
    });
  }

  ngOnInit() {
    this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.setColumnDefs();
    });
    this.updateStatusCount();
  }

  onFilterChanged() {
    if (!this.agGrid.api.getDisplayedRowCount()) {
      this.isFilterRowEmpty = true;
    } else {
      this.isFilterRowEmpty = false;
    }
  }

  updateStatusCount() {
    this.statusCount = this.rowData.reduce((acc: any, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, {});
  }

  async openAddDevice() {
    const modelRef = await this.modalService.open({
      content: AddDeviceModelComponent,
      size: '600',
    });

    modelRef.onClose.on((result) => {
      this.rowData.splice(this.rowData.length, 0, result);
      this.rowData = [...this.rowData];
      this.updateStatusCount();
      this.sharedService.showToast(
        this.translate.instant('device-add-modal.success'),
        'success',
      );
    });
  }
  setColumnDefs() {
    this.columnDefs = [
      {
        field: 'deviceName',
        headerName: this.translate.instant('device-details.device-name'),
        editable: true,
        flex: 2,
        minWidth: 150,
      },
      {
        field: 'status',
        headerName: this.translate.instant('device-details.status'),
        editable: true,
        minWidth: 150,
        flex: 1,
        filter: true,
        cellRenderer: DeviceCellRendererComponent
      },
      {
        field: 'vendor',
        headerName: this.translate.instant('device-details.vendor'),
        editable: true,
        flex: 1,
        minWidth: 150,
      },
      {
        field: 'description',
        headerName: this.translate.instant('device-details.description'),
        resizable: true,
        flex: 1,
        editable: true,
        minWidth: 150,
      },
      {
        field: 'ipAddress',
        headerName: this.translate.instant('device-details.ip-address'),
        resizable: true,
        editable: true,
        sortable: true,
        filter: true,
        flex: 1,
        minWidth: 150,
      },
      {
        field: 'quickActions',
        headerName: this.translate.instant('device-details.quick-actions'),
        resizable: true,
        maxWidth: 150,
        cellRenderer: ActionCellRendererComponent,
        cellRendererParams: {
          onDelete: this.onDelete.bind(this),
          onDuplicate: this.onDuplicate.bind(this),
          onPaste: this.onPaste.bind(this),
          onChangeStatus: this.updateStatusCount.bind(this),
        },
      },
    ];
  }

  async onDelete(rowOrgIndex: number) {
    const confirmationResponse = await showMessage.warning(
      'Delete device?',
      'Do you really want to delete the device?',
      'Delete device',
      'Cancel',
      'delete',
      'cancel',
    );

    confirmationResponse.once((result) => {
      if (result?.payload === 'delete') {
        this.rowData.splice(rowOrgIndex, 1);
        this.rowData = [...this.rowData];
        this.updateStatusCount();
        this.sharedService.showToast(
          this.translate.instant(
            'dropdown-quick-actions.success-messages.delete',
          ),
          'success',
        );
      }
    });
  }
  onDuplicate(rowOrgIndex: number) {
    const rowToDuplicate = { ...this.rowData[rowOrgIndex] };
    this.rowData.splice(rowOrgIndex + 1, 0, rowToDuplicate);
    this.rowData = [...this.rowData];
    this.sharedService.showToast(
      this.translate.instant(
        'dropdown-quick-actions.success-messages.duplicate',
      ),
      'success',
    );
    this.updateStatusCount();
  }

  onPaste(
    operType: CopiedDataOperType,
    rowIndex: number,
    currentIndex: number,
  ) {
    const rowToBeCopied = { ...this.rowData[rowIndex] };
    if (operType === CopiedDataOperType.CUT_PASTE) {
      this.rowData.splice(rowIndex, 1);
    }
    this.rowData.splice(currentIndex + 1, 0, rowToBeCopied);
    this.rowData = [...this.rowData];
    this.sharedService.showToast(
      this.translate.instant('dropdown-quick-actions.success-messages.paste'),
      'success',
    );
    this.updateStatusCount();
  }

  expandedChanged(event: CustomEvent) {
    this.expanded = event.detail.expanded;
  }

  onRowClicked(event: any) {
    this.selectedRow = event.data;
    this.selectedRowEntries = Object.entries(this.selectedRow);
    this.selectedRowEntries.forEach((item: string[]) => {
      item[0] = convertToSentenceCase(item[0]);
    });
    this.expanded = true;
  }

  onQuickFilterBy(filterString: string) {
    this._filterState = { tokens: [], categories: [] };
    if (this.filterText !== filterString) {
      this.filterText = filterString;

      this._filterState.categories = [
        {
          id: 'status',
          value: filterString,
          operator: 'Equal',
        },
      ];
    } else {
      this.filterText = '';
    }
    this.agGrid.api.onFilterChanged();
  }

  isExternalFilterPresent = () => {
    return !!this._filterState.categories.length;
  };

  doesExternalFilterPass = (node: IRowNode) => {
    if (!this.filterState.categories.length) return true;

    return this.filterState.categories.every(
      ({
        id,
        value,
        operator,
      }: {
        id: string;
        value: string;
        operator: string;
      }) => {
        switch (operator) {
          case 'Equal':
            return node.data![id] === value;
          case 'Not Equal':
            return node.data![id] !== value;
          default:
            return true;
        }
      },
    );
  };

  onCategoryChange(event: any) {
    if (!event.detail.categories.length) {
      this.filterText = '';
    }
    this._filterState.categories = [];
    this._filterState.categories = event.detail.categories;
    if (this.agGrid) {
      this.agGrid.api.onFilterChanged();
    }
  }

  toggleMaintenanceStatus() {
    this.isStatusUpdateInProgress = true;
    if (this.selectedRow.status !== 'Maintenance') {
      this.selectedRow.status = 'Maintenance';
    } else {
      this.selectedRow.status = 'Online';
    }
    this.selectedRowEntries = Object.entries(this.selectedRow);
    this.selectedRowEntries.forEach((item: string[]) => {
      item[0] = convertToSentenceCase(item[0]);
    });
    this.updateStatusCount();
    this.agGrid.api.refreshCells();

    setTimeout(() => {
      this.isStatusUpdateInProgress = false;
    }, 500);
  }
  resetFilter() {
    this._filterState = { tokens: [], categories: [] };
    this.filterText = '';
    this._filterState.categories = [];
    this.isFilterRowEmpty = false;
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }
}
