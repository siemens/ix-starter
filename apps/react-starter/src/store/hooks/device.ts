/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DeviceState } from "@/types";
import { useMemo } from "react";
import { useDataStore } from "../device-store";

export const useDeviceStatus = () => {
  const { devices } = useDataStore();

  const deviceState = useMemo(() => {
    const status: Record<DeviceState, number> = {
      Error: 0,
      Maintenance: 0,
      Offline: 0,
      Online: 0,
    };

    devices.forEach((device) => {
      status[device.status] = status[device.status] + 1;
    });

    return status;
  }, [devices]);

  return deviceState;
};
