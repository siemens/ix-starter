/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  IxDivider,
  IxDropdown, IxDropdownItem,
  IxDropdownQuickActions,
  IxIconButton,
  IxRow
} from "@siemens/ix-react";
import { ICellRendererParams } from "ag-grid-community";
import { useDataStore } from "../../../store/device-store.ts";
import { RefObject } from "react";
import { AgGridReact } from "ag-grid-react";

type CustomQuickActionsCompProps = ICellRendererParams & {
  gridRef: RefObject<AgGridReact>;
};

const CustomQuickActionsComp = (props: CustomQuickActionsCompProps) => {
  const { deleteDevice } = useDataStore();

  const startEditingFirstCell = () => {
    props.api.startEditingCell({
      rowIndex: props.node.rowIndex!,
      colKey: "deviceName"
    })
  };

  return (
    <IxRow className="d-flex justify-content-end">
      <IxIconButton icon="pen" color="color-primary" ghost onClick={startEditingFirstCell} />
      <IxIconButton
        icon="trashcan"
        color="color-primary"
        ghost
        onClick={() => {
          deleteDevice(props.data);
        }}
      />
      <IxIconButton
        icon="context-menu"
        color="color-primary"
        ghost
        id={`device_${props.node.rowIndex}`}
      ></IxIconButton>
      <IxDropdown trigger={`device_${props.node.rowIndex}`}>
        <IxDropdownQuickActions>
          <IxIconButton icon="cut" ghost></IxIconButton>
          <IxIconButton icon="bulb" ghost></IxIconButton>
          <IxIconButton
            icon="trashcan"
            ghost
            onClick={() => {
              deleteDevice(props.data);
            }}
          ></IxIconButton>
        </IxDropdownQuickActions>

        <IxDivider></IxDivider>

        <IxDropdownItem icon="star" label="Item 1"></IxDropdownItem>
        <IxDropdownItem icon="document" label="Item 2"></IxDropdownItem>
        <IxDropdownItem icon="bulb" label="Item 3"></IxDropdownItem>
      </IxDropdown>
    </IxRow>
  );
};

export default CustomQuickActionsComp;
