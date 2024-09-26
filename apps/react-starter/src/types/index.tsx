/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type MockData = {
  deviceName: string;
  vendor: string;
  description?: string;
  status: "Online" | "Offline" | "Maintenance" | "Error";
  articleNumber?: string
  macAddress: string;
  ipAddress: string;
  firmwareVersion?: string;
  serialNumber?: string;
};

export type QuickActionsProps = {
  devicesCount: number;
  errorCount: number;
  warningCount: number;
  show: () => {}
}

export type OverviewProps = {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  data: MockData
}

export type AlertCardProps = {
  title: string;
  value: number;
  variant: string;
}