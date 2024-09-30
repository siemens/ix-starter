import { create } from "zustand";
import { fetchDataSheet } from "../../util/mock-api.ts";
import { MockData } from "../../types";

interface DataStoreState {
  devices: MockData[];
  addDevice: (device: MockData) => void;
  fetch: () => Promise<void>;
}

export const useDataStore = create<DataStoreState>((set) => ({
  devices: [],
  addDevice: (device: MockData) => set((state) => ({ devices: [...state.devices, device] })),
  fetch: async () => {
    const response = fetchDataSheet();
    set({ devices: await response });
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