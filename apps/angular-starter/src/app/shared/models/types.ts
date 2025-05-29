export interface FilterCriteria {
  id: string;
  value: any;
  operator: string;
}

export interface DeviceData {
  deviceName: string;
  status: string;
  vendor: string;
  description: string;
  ipAddress: string;
  articleNumber: string;
  macAddress: string;
  firmwareVersion: string;
  serialNumber: string;
}

export type DeviceState = 'Online' | 'Offline' | 'Maintenance' | 'Error';

export interface Device {
  id?: string;
  deviceName: string;
  vendor: string;
  description?: string;
  status: DeviceState;
  articleNumber?: string;
  macAddress: string;
  ipAddress: string;
  firmwareVersion?: string;
  serialNumber?: string;
}

export enum CopiedDataOperType {
  COPY_PASTE = 'copy-paste',
  CUT_PASTE = 'cut-paste',
}
