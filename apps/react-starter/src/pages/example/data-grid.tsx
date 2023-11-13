/*
 * SPDX-FileCopyrightText: 2023 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import '@siemens/ix-aggrid/dist/ix-aggrid/ix-aggrid.css';
import { GridOptions } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { MockData } from './mock-data';
import { fetchDataSheet } from '../../utils/mock-api';

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
  rowData: [],
  rowSelection: 'multiple',
  suppressCellFocus: true,
} as GridOptions;

export default function DateGrid(props: {
  selected: MockData | null;
  onSelectionChange: (entry: MockData) => void;
}) {
  const gridRef = useRef<AgGridReact<any>>(null);
  const [data, setData] = useState<MockData[]>([]);

  const onApiReady = async () => {
    const api = gridRef.current?.api;
    if (!api) {
      return;
    }

    if (!data.length) {
      api.showLoadingOverlay();

      const result = await fetchDataSheet();
      setData(result.data);

      api.hideOverlay();
    }
  };

  useEffect(() => {
    const api = gridRef.current?.api;
    if (!api) {
      return;
    }

    if (!data.length) {
      return;
    }

    const selected = props.selected;

    if (selected) {
      api.forEachNodeAfterFilter((row) => {
        if (row.data.id === selected.id) {
          row.setSelected(true);
        }
      });
    }
  }, [data]);

  return (
    <div
      className="ag-theme-alpine-dark ag-theme-ix"
      style={{ width: '100%', height: '100%' }}
    >
      <AgGridReact
        onGridReady={onApiReady}
        ref={gridRef}
        gridOptions={gridOptions}
        rowData={data}
        onSelectionChanged={({ api }) => {
          const [row] = api.getSelectedRows();
          props.onSelectionChange(row);
        }}
      />
    </div>
  );
}
