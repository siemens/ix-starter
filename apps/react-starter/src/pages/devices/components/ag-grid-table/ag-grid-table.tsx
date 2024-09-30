/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {AgGridReact} from 'ag-grid-react';
import {IxEmptyState} from "@siemens/ix-react";
import CustomQuickActionsComp from "./custom-cell-renderet.tsx";
import camelCaseToNormal from "../../../../util/util.ts";
import {CellClickedEvent, ColDef} from "ag-grid-community";
import {useDataStore, useOverviewPaneStore} from "../../../store/device-store.ts";
import {MockData} from "../../../../types";

type AgGridTableProps = {
  data: MockData[],
  searchTerm: string,
}

function AgGridTable({data, searchTerm}: AgGridTableProps) {
  const {setExpanded, setSelectedData} = useOverviewPaneStore();
  const {editDevice} = useDataStore();

  const onRowClicked = (event: CellClickedEvent) => {
    if (event.column.getColId() === 'quickActions') {
      return;
    }

    setSelectedData(event.data);
    setExpanded(true);
  };

  const getColumnDefs = () => {
    if (data.length === 0) {
      return [];
    }
    const keyNames = Object.keys(data[0]);
    const columnDefs: ColDef[] = keyNames.map((key) => {
      return {
        field: key,
        headerName: camelCaseToNormal(key),
        editable: true
      };
    });

    columnDefs.push({
      field: 'quickActions',
      headerName: '',
      cellRenderer: CustomQuickActionsComp,
    });

    return columnDefs;
  };

  return (
    data ? (
      <div style={{height: '100%', width: '100%'}}>
        <AgGridReact
          quickFilterText={searchTerm}
          columnDefs={[
            ...getColumnDefs(),
            {cellEditor: true, cellEditorPopup: false}
          ]}
          suppressRowTransform={true}
          rowData={data}
          className="ag-theme-alpine-dark ag-theme-ix"
          onCellClicked={onRowClicked}
          onCellValueChanged={(e) => editDevice(e.data)}
        />
      </div>
    ) : (
      <div
        className="w-100 h-100 d-flex justify-content-center align-content-center">
        <IxEmptyState
          header="No devices found"
          subHeader="Please remove search terms or add a new device"
          icon="project"
          action="Add device"
          onActionClick={console.log}
        ></IxEmptyState>
      </div>
    )
  );
}

export default AgGridTable;