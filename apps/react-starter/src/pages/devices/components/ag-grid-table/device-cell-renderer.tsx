/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from "./styles.module.css";
import { IxIcon, IxRow, IxTypography } from "@siemens/ix-react";
import { ICellRendererParams } from "ag-grid-community";
import { RefObject } from "react";
import { AgGridReact } from "ag-grid-react";
import {iconAlarm, iconMaintenance, iconSingleCheck, iconWarning} from "@siemens/ix-icons/icons";

type CustomDeviceCellRendererProps = ICellRendererParams & {
  gridRef: RefObject<AgGridReact>;
};

const CustomDeviceCellRenderer = (props: CustomDeviceCellRendererProps) => {
  return (
    <IxRow className={styles.DeviceRow}>
      {props.data.status === "Online" ? (
        <IxIcon name={iconSingleCheck} color="color-success" />
      ) : props.data.status === "Offline" ? (
        <IxIcon name={iconAlarm} color="color-alarm" />
      ) : props.data.status === "Maintenance" ? (
        <IxIcon name={iconMaintenance} color="color-warning" />
      ) : (
        <IxIcon name={iconWarning} color="color-alarm" />
      )}
      <IxTypography className={styles.DeviceName}>{props.data.status}</IxTypography>
    </IxRow>
  );
};

export default CustomDeviceCellRenderer;
