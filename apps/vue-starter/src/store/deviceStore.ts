/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineStore } from "pinia";
import { ref } from "vue";
import type { Device } from "@/types";

export interface Filter {
  id: string;
  value: string;
  operator: string;
}

export const useDeviceStore = defineStore("device", () => {
  const devices = ref<Device[]>([]);

  const insertDevice = (index: number, device: Device) => {
    const newDevice = { ...device, id: devices.value.length.toString() };
    devices.value.splice(index, 0, newDevice);
  };

  const addDevice = (device: Omit<Device, "id">) => {
    const newDevice = {
      ...device,
      id: devices.value.length.toString(),
    };
    devices.value.push(newDevice);
  };

  const deleteDevice = (device: Device) => {
    devices.value = devices.value.filter((d) => d.id !== device.id);
  };

  const editDevice = (device: Device) => {
    const index = devices.value.findIndex((d) => d.id === device.id);
    if (index !== -1) {
      devices.value[index] = device;
    }
  };

  const fetchDevices = async () => {
    try {
      const response = await fetch("/data.json");
      const data = await response.json();
      const devicesWithId = data.map((device: Device, index: number) => ({
        ...device,
        id: (index + 1).toString(),
      }));
      devices.value = devicesWithId;
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  return {
    devices,
    addDevice,
    deleteDevice,
    editDevice,
    fetchDevices,
    insertDevice,
  };
});
