/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "./styles.module.css";
import {AgGridReact} from 'ag-grid-react';
import {IxEmptyState} from "@siemens/ix-react";
import CustomQuickActionsComp from "./custom-cell-renderet.tsx";
import camelCaseToNormal from "../../../../util/util.ts";
import {CellClickedEvent, ColDef, IRowNode} from "ag-grid-community";
import {useDataStore, useFilterStore, useOverviewPaneStore} from "../../../store/device-store.ts";
import {MockData} from "../../../../types";
import {useCallback, useEffect, useRef, useState} from "react";
import {LogicalFilterOperator} from "@siemens/ix";

function AgGridTable() {
  const gridRef = useRef<AgGridReact<MockData>>(null);
  const {setExpanded, setSelectedData} = useOverviewPaneStore();
  const {filter, resetFilter} = useFilterStore();
  const [showEmptyState, setShowEmptyState] = useState(false);
  const {devices, editDevice} = useDataStore();

  const onRowClicked = (event: CellClickedEvent) => {
    if (event.column.getColId() === 'quickActions') {
      return;
    }

    setSelectedData(event.data);
    setExpanded(true);
  };

  const getColumnDefs = () => {
    if (devices.length === 0) {
      return [];
    }
    const keyNames = Object.keys(devices[0]);
    const columnDefs: ColDef[] = keyNames
      .filter(key => key !== 'id')
      .map((key) => {
        return {
          field: key,
          headerName: camelCaseToNormal(key),
          editable: true
        };
      });

    columnDefs.pop()

    columnDefs.push({
      field: 'quickActions',
      headerName: '',
      cellRenderer: CustomQuickActionsComp,
    });

    return columnDefs;
  };

  const isExternalFilterPresent = useCallback((): boolean => {
    return true;
  }, []);

  function doesExternalFilterPass(node: IRowNode<MockData>): boolean {
    if (node.data?.hidden) {
      return false;
    }
    if (filter.length) {
      return filter.every(({ id, value, operator }) => {
        switch (operator) {
          case LogicalFilterOperator.EQUAL:
            return node.data![id as keyof MockData] === value;
          case LogicalFilterOperator.NOT_EQUAL:
            return node.data![id as keyof MockData] !== value;
          default:
            return true;
        }
      });
    }
    return true;
  }

  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      setShowEmptyState(gridRef.current.api.getDisplayedRowCount() === 0);
    } else {
      setShowEmptyState(false);
    }
  }, [filter]);

  return (
    devices && !showEmptyState ? (
      <div style={{ height: '40rem',}}>
        <AgGridReact
          ref={gridRef}
          columnDefs={[
            ...getColumnDefs(),
            {cellEditor: true, cellEditorPopup: false}
          ]}
          suppressRowTransform={true}
          rowData={devices}
          className="ag-theme-alpine-dark ag-theme-ix"
          onCellClicked={onRowClicked}
          onCellValueChanged={(e) => editDevice(e.data)}
          isExternalFilterPresent={isExternalFilterPresent}
          doesExternalFilterPass={(e) => doesExternalFilterPass(e as IRowNode<MockData>)}
        />
      </div>
    ) : (
      <div
        className="w-100 h-100 d-flex justify-content-center align-items-center">
          <IxEmptyState
            header="No devices found"
            subHeader="Please remove search terms or add a new device"
            icon="project"
            action="Reset Filter"
            onActionClick={() => resetFilter()}
          ></IxEmptyState>
      </div>
    )
  );
}

export default AgGridTable;