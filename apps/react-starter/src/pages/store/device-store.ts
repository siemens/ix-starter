/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { create } from "zustand";
import { fetchDataSheet } from "../../util/mock-api.ts";
import { MockData } from "../../types";
import { LogicalFilterOperator } from "@siemens/ix";

interface DataStoreState {
  devices: MockData[];
  addDevice: (device: MockData) => void;
  pasteDevice: (device: MockData, position: number) => void;
  deleteDevice: (device: MockData) => void;
  editDevice: (device: MockData) => void;
  fetch: () => Promise<void>;
}

export const useDataStore = create<DataStoreState>((set) => ({
  devices: [],
  addDevice: (device: MockData) =>
    set((state) => {
      const newDevice = { ...device, id: state.devices.length.toString() };
      return { devices: [...state.devices, newDevice] };
    }),
  pasteDevice: (device: MockData, position: number) =>
    set((state) => {
      const newDevice = { ...device, id: state.devices.length.toString() };
      const updatedDevices = [
        ...state.devices.slice(0, position),
        newDevice,
        ...state.devices.slice(position),
      ];
      return { devices: updatedDevices };
    }),
  deleteDevice: (device: MockData) =>
    set((state) => ({ devices: state.devices.filter((d) => d.id !== device.id) })),
  editDevice: (device: MockData) =>
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
  selectedData: MockData | null;
  setExpanded: (expanded: boolean) => void;
  setSelectedData: (selectedData: MockData) => void;
}

export const useOverviewPaneStore = create<OverviewPaneStore>((set) => ({
  expanded: false,
  selectedData: null,
  setExpanded: (expanded: boolean) => set({ expanded }),
  setSelectedData: (selectedData: MockData) => set({ selectedData }),
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
