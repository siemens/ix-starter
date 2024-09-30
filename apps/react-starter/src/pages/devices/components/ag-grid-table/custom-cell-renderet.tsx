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
import {
  iconCopy,
  iconCut,
  iconDuplicate,
  iconEyeCancelled,
  iconPaste,
  iconRename,
  iconTrashcan
} from "@siemens/ix-icons/icons";

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
    <IxRow className="d-flex justify-content-end h-100 align-items-center">
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
          <IxIconButton icon={iconDuplicate} ghost></IxIconButton>
          <IxIconButton icon={iconCut} ghost></IxIconButton>
          <IxIconButton icon={iconCopy} ghost></IxIconButton>
          <IxIconButton icon={iconPaste} ghost></IxIconButton>
        </IxDropdownQuickActions>
        <IxDivider></IxDivider>
        <IxDropdownItem icon={iconRename} label="Rename"></IxDropdownItem>
        <IxDropdownItem icon={iconEyeCancelled} label="Hide"></IxDropdownItem>
        <IxDivider />
        <IxDropdownItem
          icon={iconTrashcan}
          label="Delete"
          onClick={() => {
          deleteDevice(props.data);
        }}>
        </IxDropdownItem>
      </IxDropdown>
    </IxRow>
  );
};

export default CustomQuickActionsComp;
