/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export type Incident = {
  id: number;
  incidentName: string;
  icon: string;
  infoText: string;
  deviceName: string;
  ipAddress: string;
  date: string;
  time: string;
  color: string;
};
