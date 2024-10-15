/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { create } from "zustand";
import { fetchDataSheet } from "../util/mock-api.ts";
import { Device } from "../types/index.tsx";
import { LogicalFilterOperator } from "@siemens/ix";

interface DataStoreState {
  devices: Device[];
  addDevice: (device: Device) => void;
  pasteDevice: (device: Device, position: number) => void;
  deleteDevice: (device: Device) => void;
  editDevice: (device: Device) => void;
  fetch: () => Promise<void>;
}

export const useDataStore = create<DataStoreState>((set) => ({
  devices: [],
  addDevice: (device: Device) =>
    set((state) => {
      const newDevice = { ...device, id: state.devices.length.toString() };
      return { devices: [...state.devices, newDevice] };
    }),
  pasteDevice: (device: Device, position: number) =>
    set((state) => {
      const newDevice = { ...device, id: position.toString() };
      const updatedDevices = [
        ...state.devices.slice(0, position),
        newDevice,
        ...state.devices.slice(position),
      ];
      return { devices: updatedDevices };
    }),
  deleteDevice: (device: Device) =>
    set((state) => ({ devices: state.devices.filter((d) => d.id !== device.id) })),
  editDevice: (device: Device) =>
    set((state) => ({ devices: state.devices.map((d) => (d.id === device.id ? device : d)) })),
  fetch: async () => {
    const response = await fetchDataSheet();
    const devicesWithId = response.map((device, index) => ({
      ...device,
      id: (index + 1).toString(),
    }));
    set({ devices: devicesWithId });
  },
}));

interface OverviewPaneStore {
  expanded: boolean;
  selectedDataId: string | null;
  setExpanded: (expanded: boolean) => void;
  setSelectedDeviceId: (selectedDataId: string) => void;
}

export const useOverviewPaneStore = create<OverviewPaneStore>((set) => ({
  expanded: false,
  selectedDataId: null,
  setExpanded: (expanded: boolean) => set({ expanded }),
  setSelectedDeviceId: (selectedDataId: string) => set({ selectedDataId }),
}));

export interface Filter {
  id: string;
  value: string;
  operator: LogicalFilterOperator;
}

interface FilterStore {
  filter: Filter[];
  setFilter: (filter: Filter[]) => void;
  resetFilter: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filter: [],
  setFilter: (filter: Filter[]) => {
    set((state) => {
      if (filter.length !== state.filter.length) {
        return { filter };
      }

      return state;
    });
  },
  resetFilter: () => set({ filter: [] }),
}));
