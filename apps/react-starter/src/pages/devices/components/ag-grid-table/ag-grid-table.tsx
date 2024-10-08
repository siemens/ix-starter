/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "./styles.module.css";
import "./styles.module.css";
import { AgGridReact } from "ag-grid-react";
import { IxEmptyState } from "@siemens/ix-react";
import QuickActionsCellRenderer from "./quick-actions-cell-renderet.tsx";
import { CellClickedEvent, ColDef, ColGroupDef, IRowNode } from "ag-grid-community";
import { useDataStore, useFilterStore, useOverviewPaneStore } from "../../../store/device-store.ts";
import { Device } from "../../../../types";
import { useCallback, useEffect, useRef, useState } from "react";
import { LogicalFilterOperator } from "@siemens/ix";
import CustomDeviceCellRenderer from "./device-cell-renderer.tsx";
import { useTranslation } from "react-i18next";
import DeviceNameCellRenderer from "./device-name-cell-renderer.tsx";

function AgGridTable() {
  const { t } = useTranslation();
  const gridRef = useRef<AgGridReact<Device>>(null);
  const { setExpanded, setSelectedData } = useOverviewPaneStore();
  const { filter, resetFilter } = useFilterStore();
  const [showEmptyState, setShowEmptyState] = useState(false);
  const { devices, editDevice } = useDataStore();

  function onCellClick(event: CellClickedEvent<Device, string>) {
    if (event.column.getColId() === "quickActions") {
      return;
    }

    setSelectedData(event.data!);
    setExpanded(true);
  }

  function getColumnDefs() {
    if (devices.length === 0) {
      return [];
    }

    return [
      {
        field: "deviceName",
        headerName: `${t("device-details.device-name")}`,
        editable: true,
        flex: 2,
        minWidth: 150,
        cellRenderer: DeviceNameCellRenderer,
      },
      {
        field: "status",
        headerName: `${t("device-details.status")}`,
        editable: true,
        flex: 1,
        minWidth: 150,
        cellRenderer: CustomDeviceCellRenderer,
      },
      {
        field: "vendor",
        headerName: `${t("device-details.vendor")}`,
        editable: true,
        flex: 1,
        minWidth: 150,
      },
      {
        field: "description",
        headerName: `${t("device-details.description")}`,
        editable: true,
        flex: 1,
        minWidth: 150,
      },
      {
        field: "ipAddress",
        headerName: `${t("device-details.ip-address")}`,
        editable: true,
        flex: 1,
        minWidth: 150,
      },
      {
        field: "quickActions",
        headerName: "Quick actions",
        maxWidth: 150,
        cellRenderer: QuickActionsCellRenderer,
      },
    ];
  }

  const isExternalFilterPresent = useCallback((): boolean => {
    return true;
  }, []);

  function doesExternalFilterPass(node: IRowNode<Device>): boolean {
    if (filter.length) {
      return filter.every(({ id, value, operator }) => {
        switch (operator) {
          case LogicalFilterOperator.EQUAL:
            return node.data![id as keyof Device] === value;
          case LogicalFilterOperator.NOT_EQUAL:
            return node.data![id as keyof Device] !== value;
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

  return devices && !showEmptyState ? (
    <div className="flex-grow-1">
      <AgGridReact
        ref={gridRef}
        columnDefs={getColumnDefs() as ColDef[] | ColGroupDef[]}
        suppressRowTransform={true}
        suppressCellFocus={true}
        rowSelection={"single"}
        rowData={devices}
        className="ag-theme-alpine-dark ag-theme-ix"
        onCellClicked={(e) => onCellClick(e)}
        onCellValueChanged={(e) => editDevice(e.data)}
        isExternalFilterPresent={isExternalFilterPresent}
        doesExternalFilterPass={(e) => doesExternalFilterPass(e as IRowNode<Device>)}
      />
    </div>
  ) : (
    <div className="flex-grow-1 d-flex justify-content-center align-items-center">
      <IxEmptyState
        header="No devices found"
        subHeader="Please remove search terms or add a new device"
        icon="project"
        action="Reset Filter"
        onActionClick={() => resetFilter()}
      ></IxEmptyState>
    </div>
  );
}

export default AgGridTable;
