import './styles.module.css';
import {AgGridReact} from 'ag-grid-react';
import { IxEmptyState } from "@siemens/ix-react";
import CustomQuickActionsComp from "./custom-cell-renderet.tsx";
import camelCaseToNormal from "../../../../util/util.ts";
import {ColDef} from "ag-grid-community";
function AgGridTable({onRowClick, data, searchTerm}) {

  const onRowClicked = (event) => {
    onRowClick(event.data);
  };

  const getColumnDefs = () => {
    if(data.length === 0) {
      return [];
    }
    const keyNames = Object.keys(data[0]);
    const columnDefs: ColDef[] = keyNames.map((key) => {
      return {
        field: key,
        headerName: camelCaseToNormal(key),
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
          rowData={data}
          className="ag-theme-alpine-dark ag-theme-ix"
          onRowClicked={onRowClicked}
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
};

export default AgGridTable;