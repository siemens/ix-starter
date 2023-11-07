/*
 * SPDX-FileCopyrightText: 2023 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import '@siemens/ix-aggrid/dist/ix-aggrid/ix-aggrid.css';
import { GridOptions } from 'ag-grid-community';
import { exampleMockData } from './mock-data';

const gridOptions = {
  columnDefs: [
    {
      field: 'account',
      headerName: 'Account',
    },
    {
      field: 'country',
      headerName: 'Country',
    },
    {
      field: 'online_minutes',
      headerName: 'Online today (h:mm)',
    },
    {
      field: 'service',
      headerName: 'Application',
    },
    {
      field: 'service',
      headerName: 'Application',
    },
  ],
  rowData: exampleMockData,
  rowSelection: 'multiple',
  suppressCellFocus: true,
} as GridOptions;

export default function DateGrid() {
  return (
    <div
      className="ag-theme-alpine-dark ag-theme-ix"
      style={{ width: '100%', height: '100%' }}
    >
      <AgGridReact gridOptions={gridOptions} />
    </div>
  );
}
