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
  IxDropdown,
  IxDropdownItem,
  IxDropdownQuickActions,
  IxIconButton,
  IxRow,
  showModal,
} from "@siemens/ix-react";
import { ICellRendererParams } from "ag-grid-community";
import { useDataStore } from "../../../store/device-store.ts";
import { RefObject } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  iconCopy,
  iconCut,
  iconDuplicate,
  iconPaste,
  iconPcTower,
  iconRename,
  iconTrashcan,
} from "@siemens/ix-icons/icons";
import DeleteModal from "./delete-modal.tsx";
import { useTranslation } from "react-i18next";
import {showSuccessToast} from "../../../../util/util.ts";

type CustomQuickActionsCompProps = ICellRendererParams & {
  gridRef: RefObject<AgGridReact>;
};

const CustomQuickActionsComp = (props: CustomQuickActionsCompProps) => {
  const { t } = useTranslation();
  const { deleteDevice, editDevice, pasteDevice } = useDataStore();

  const startEditingFirstCell = () => {
    props.api.startEditingCell({
      rowIndex: props.node.rowIndex!,
      colKey: "deviceName",
    });
  };

  const handleCopy = () => {
    const cellValue = JSON.stringify(props.data);
    navigator.clipboard
      .writeText(cellValue)
      .then(() => {
        showSuccessToast(t("dropdown-quick-actions.success-messages.copy"));
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  const handleCut = () => {
    handleCopy();
    deleteDevice(props.data);
    showSuccessToast(t("dropdown-quick-actions.success-messages.cut"));
  };

  const handlePaste = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        try {
          const data = JSON.parse(text);
          pasteDevice(data, props.data.id);
          showSuccessToast(t("dropdown-quick-actions.success-messages.cpaste"));
        } catch (err) {
          console.error("Failed to parse clipboard data:", err);
        }
      })
      .catch((err) => {
        console.error("Failed to read from clipboard:", err);
      });
  };

  const handleDelete = async () => {
    const instance = await showModal({
      content: <DeleteModal />,
    });

    instance.onClose.on(() => {
      deleteDevice(props.data);
      showSuccessToast(t("dropdown-quick-actions.success-messages.delete"));
    });
  };

  const handleDuplicate = () => {
    pasteDevice(props.data, props.data.id);
    showSuccessToast(t("dropdown-quick-actions.success-messages.duplicate"));
  }

  return (
    <IxRow className="d-flex justify-content-end h-100 align-items-center">
      <IxIconButton icon="pen" color="color-primary" ghost onClick={startEditingFirstCell} />
      <IxIconButton icon="trashcan" color="color-primary" ghost onClick={handleDelete} />
      <IxIconButton
        icon="context-menu"
        color="color-primary"
        ghost
        id={`device_${props.node.rowIndex}`}
      ></IxIconButton>
      <IxDropdown trigger={`device_${props.node.rowIndex}`}>
        <IxDropdownQuickActions>
          <IxIconButton
            icon={iconDuplicate}
            ghost
            onClick={handleDuplicate}
          ></IxIconButton>
          <IxIconButton icon={iconCut} ghost onClick={handleCut}></IxIconButton>
          <IxIconButton icon={iconCopy} ghost onClick={handleCopy}></IxIconButton>
          <IxIconButton icon={iconPaste} ghost onClick={handlePaste}></IxIconButton>
        </IxDropdownQuickActions>
        <IxDivider></IxDivider>
        <IxDropdownItem
          icon={iconRename}
          label={t("dropdown-quick-actions.rename")}
          onClick={startEditingFirstCell}
        ></IxDropdownItem>
        <IxDropdownItem
          icon={iconPcTower}
          label={
            props.data.status === "Online"
              ? t("dropdown-quick-actions.off")
              : t("dropdown-quick-actions.on")
          }
          onClick={() => {
            const updatedDevice = {
              ...props.data,
              status: props.data.status === "Online" ? "Offline" : "Online",
            };
            editDevice(updatedDevice);
            props.api.onFilterChanged();
            console.log("Toggled hidden state for:", updatedDevice);
          }}
        />
        <IxDivider />
        <IxDropdownItem icon={iconTrashcan} label={t("dropdown-quick-actions.delete")} onClick={handleDelete}></IxDropdownItem>
      </IxDropdown>
    </IxRow>
  );
};

export default CustomQuickActionsComp;
