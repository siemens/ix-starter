/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type DeviceState = "Online" | "Offline" | "Maintenance" | "Error";

export type Device = {
  id: string;
  deviceName: string;
  vendor: string;
  description?: string;
  status: DeviceState;
  articleNumber?: string;
  macAddress: string;
  ipAddress: string;
  firmwareVersion?: string;
  serialNumber?: string;
};
