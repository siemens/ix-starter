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
import {CellClickedEvent, ColDef, ColGroupDef, IRowNode} from "ag-grid-community";
import {useDataStore, useFilterStore, useOverviewPaneStore} from "../../../store/device-store.ts";
import {MockData} from "../../../../types";
import {useCallback, useEffect, useRef, useState} from "react";
import {LogicalFilterOperator} from "@siemens/ix";
import CustomDeviceCellRenderer from "./device-cell-renderer.tsx";

function AgGridTable() {
  const gridRef = useRef<AgGridReact<MockData>>(null);
  const {setExpanded, setSelectedData} = useOverviewPaneStore();
  const {filter, resetFilter} = useFilterStore();
  const [showEmptyState, setShowEmptyState] = useState(false);
  const {devices, editDevice} = useDataStore();

  function onCellClick (event: CellClickedEvent<MockData, any>) {
    console.log(event);
    if (event.column.getColId() === 'quickActions') {
      return;
    }

    setSelectedData(event.data!);
    setExpanded(true);
  }

  function createColumnDef(key: string, cellRenderer?: any) {
    return {
      field: key,
      headerName: camelCaseToNormal(key),
      editable: true,
      ...(cellRenderer && { cellRenderer }),
    };
  }

  function createColumnGroup(headerName: string, keys: string[]) {
    return {
      headerName,
      children: keys.map((key, index) => ({
        columnGroupShow: index === 0 ? 'close' : 'open',
        field: key,
        headerName: camelCaseToNormal(key),
        editable: true,
      })),
    };
  }

  function getColumnDefs() {
    if (devices.length === 0) {
      return [];
    }

    const keyNames = Object.keys(devices[0]);
    const lastFourKeys = keyNames.slice(-6);
    const otherKeys = keyNames.slice(0, -6);

    return [
      createColumnDef(otherKeys[0], CustomDeviceCellRenderer),
      ...otherKeys.slice(1).map((key) => createColumnDef(key)),
      createColumnGroup('Detail Groups', lastFourKeys),
      createColumnDef('quickActions', CustomQuickActionsComp),
    ];
  }

  const isExternalFilterPresent = useCallback((): boolean => {
    return true;
  }, []);

  function doesExternalFilterPass(node: IRowNode<MockData>): boolean {
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
          columnDefs={getColumnDefs() as ColDef[] | ColGroupDef[]}
          suppressRowTransform={true}
          rowData={devices}
          className="ag-theme-alpine-dark ag-theme-ix"
          onCellClicked={(e) => onCellClick(e)}
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