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
import { iconAlarm, iconSingleCheck, iconWarning } from "@siemens/ix-icons/icons";

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
      ) : (
        <IxIcon name={iconWarning} color="color-warning" />
      )}
      <IxTypography className={styles.DeviceName}>{props.data.deviceName}</IxTypography>
    </IxRow>
  );
};

export default CustomDeviceCellRenderer;
