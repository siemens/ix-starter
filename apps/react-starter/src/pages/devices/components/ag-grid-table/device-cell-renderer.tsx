/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { iconError, iconInfo, iconMaintenanceWarning, iconSuccess } from "@siemens/ix-icons/icons";
import { IxIcon, IxRow, IxTypography } from "@siemens/ix-react";
import { ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";
import styles from "./styles.module.css";

type CustomDeviceCellRendererProps = ICellRendererParams & {
  gridRef: RefObject<AgGridReact>;
};

const CustomDeviceCellRenderer = (props: CustomDeviceCellRendererProps) => {
  return (
    <IxRow className={styles.DeviceRow}>
      {props.data.status === "Online" ? (
        <IxIcon name={iconSuccess} color="color-success" />
      ) : props.data.status === "Offline" ? (
        <IxIcon name={iconInfo} />
      ) : props.data.status === "Maintenance" ? (
        <IxIcon name={iconMaintenanceWarning} color="color-warning" />
      ) : (
        <IxIcon name={iconError} color="color-alarm" />
      )}
      <IxTypography className={styles.DeviceName}>{props.data.status}</IxTypography>
    </IxRow>
  );
};

export default CustomDeviceCellRenderer;
