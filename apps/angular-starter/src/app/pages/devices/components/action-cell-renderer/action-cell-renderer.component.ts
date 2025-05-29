import { Component, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  IxDivider,
  IxDropdown,
  IxDropdownButton,
  IxDropdownItem,
  IxDropdownQuickActions,
  IxIconButton,
  IxRow,
  IxTooltip,
} from '@siemens/ix-angular/standalone';
import { addIcons } from '@siemens/ix-icons';
import {
  iconContextMenu,
  iconCopy,
  iconCut,
  iconDuplicate,
  iconPaste,
  iconPcTower,
  iconPen,
  iconQuestion,
  iconRename,
  iconTrashcan,
} from '@siemens/ix-icons/icons';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { SharedService } from '../../../../shared/services/shared.service';
import { CopiedDataOperType } from '../../../../shared/models/types';

@Component({
  selector: 'app-action-cell-renderer',
  standalone: true,
  imports: [
    IxDropdown,
    IxDropdownQuickActions,
    IxDropdownButton,
    IxIconButton,
    IxDivider,
    IxDropdownItem,
    IxRow,
    IxTooltip,
    TranslateModule,
  ],
  templateUrl: './action-cell-renderer.component.html',
  styleUrl: './action-cell-renderer.component.scss',
})
export class ActionCellRendererComponent implements ICellRendererAngularComp {
  @ViewChild('dropdownRef') dropdown!: IxDropdown;

  params: any;
  triggerId: string = '';
  canPaste: boolean = false;

  constructor(
    private readonly sharedService: SharedService,
    private readonly translate: TranslateService,
  ) {
    addIcons({
      iconPen,
      iconTrashcan,
      iconCut,
      iconCopy,
      iconPaste,
      iconContextMenu,
      iconDuplicate,
      iconRename,
      iconPcTower,
      iconQuestion,
    });
  }
  agInit(params: any): void {
    this.params = params;
    this.triggerId = `menu-trigger-${params.node.id}`;
    this.sharedService.canPasteSubject.subscribe((canPaste) => {
      this.canPaste = canPaste;
    });
  }

  refresh(params: any): boolean {
    return false;
  }

  onEdit(event: MouseEvent) {
    event.stopPropagation();
    const gridApi = this.params.api;
    const firstColumn = gridApi.getColumnDefs()[0];
    const firstColumnField = firstColumn.field;
    const nodeId = this.params.node.id;

    // Get the actual node using ID
    const node = gridApi.getRowNode(nodeId);
    if (node) {
      gridApi.startEditingCell({
        rowIndex: node.rowIndex,
        colKey: firstColumnField,
      });
      gridApi.setFocusedCell(node.rowIndex, firstColumnField);
    }
  }

  onDelete(event: MouseEvent) {
    event.stopPropagation();
    const nodeId = this.params.node.id;
    this.params.onDelete(parseInt(nodeId));
  }

  onDuplicate(event: MouseEvent) {
    event.stopPropagation();
    const nodeId = this.params.node.id;
    this.params.onDuplicate(parseInt(nodeId));
  }

  copyRow(event: MouseEvent) {
    event.stopPropagation();
    const copiedRowData = {
      operType: CopiedDataOperType.COPY_PASTE,
      rowIndex: this.params.node.rowIndex,
    };
    navigator.clipboard.writeText(JSON.stringify(copiedRowData));
    this.sharedService.canPasteSubject.next(true);
    this.sharedService.showToast(
      this.translate.instant('dropdown-quick-actions.success-messages.copy'),
      'info',
    );
    this.dropdown.show = false;
  }

  cutRow(event: MouseEvent) {
    this.params.api.refreshCells();
    event.stopPropagation();
    const copiedRowData = {
      operType: CopiedDataOperType.CUT_PASTE,
      rowIndex: this.params.node.rowIndex,
    };
    navigator.clipboard.writeText(JSON.stringify(copiedRowData));
    this.sharedService.canPasteSubject.next(true);
    this.sharedService.showToast(
      this.translate.instant('dropdown-quick-actions.success-messages.cut'),
      'info',
    );
    this.dropdown.show = false;
  }

  async pasteRow(event: MouseEvent) {
    event.stopPropagation();
    try {
      const text = await navigator.clipboard.readText();
      const copiedRowData = JSON.parse(text);
      let currentRowIndex = this.params.node.rowIndex;
      if (
        copiedRowData.operType == CopiedDataOperType.CUT_PASTE &&
        copiedRowData.rowIndex <= this.params.node.rowIndex
      ) {
        currentRowIndex--;
      }
      this.params.onPaste(
        copiedRowData.operType,
        copiedRowData.rowIndex,
        currentRowIndex,
      );
      navigator.clipboard.writeText('');
      this.sharedService.canPasteSubject.next(false);
    } catch (error: any) {
      this.sharedService.showToast(
        this.translate.instant(
          'dropdown-quick-actions.success-messages.pasteErrorMsg',
        ),
        'warning',
      );
    }
  }

  changeStatus(event: MouseEvent) {
    event.stopPropagation();
    if (this.params.data.status === 'Online') {
      this.params.data.status = 'Offline';
    } else {
      this.params.data.status = 'Online';
    }
    this.params.onChangeStatus();
    this.params.api.refreshCells();
  }
}
