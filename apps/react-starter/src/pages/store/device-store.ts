import {create} from "zustand";
import {fetchDataSheet} from "../../util/mock-api.ts";

export const useDataStore: any = create((set) => ({
  devices: [] as MockData[],
  addDevice: (device: MockData) => set((state) => ({ devices: [...state.devices, device] })),
  fetch: async () => {
    const response = fetchDataSheet();
    set({ devices: await response })
  },
}))