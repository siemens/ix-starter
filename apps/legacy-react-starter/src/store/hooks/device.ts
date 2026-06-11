/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Device, DeviceState } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { useDataStore, useOverviewPaneStore } from "../device-store";

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

export const useSelectedDevice = () => {
  const { devices } = useDataStore();
  const { selectedDataId } = useOverviewPaneStore();

  const [device, setDevice] = useState<Device | null>(null);

  useEffect(() => {
    const selectedDevice = devices.find((device) => device.id === selectedDataId);
    setDevice(selectedDevice ?? null);
  }, [devices, selectedDataId]);

  return device;
};