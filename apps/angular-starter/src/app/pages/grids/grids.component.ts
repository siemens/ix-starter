import { Component } from '@angular/core';
import { IxContentHeader, IxTypography } from '@siemens/ix-angular/standalone';
import { AgGridAngular } from 'ag-grid-angular';
import * as ag from 'ag-grid-community';
import { ColDef } from 'ag-grid-community';
import { getIxTheme } from '@siemens/ix-aggrid';
import { GRID_ROW_DATA, GRID_COL_DEFS, type GridRowData } from '../../../shared';

@Component({
  selector: 'app-grids',
  standalone: true,
  imports: [IxContentHeader, IxTypography, AgGridAngular],
  templateUrl: './grids.component.html',
  styleUrl: './grids.component.css',
})
export class GridsComponent {
  protected readonly ixTheme = getIxTheme(ag);

  rowData = GRID_ROW_DATA;

  columnDefs: ColDef<GridRowData>[] = GRID_COL_DEFS;
}
