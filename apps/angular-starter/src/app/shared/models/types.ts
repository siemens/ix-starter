export interface FilterCriteria {
  id: string;
  value: any;
  operator: string;
}

export interface DeviceData {
  id?: string;
  deviceName: string;
  status: string;
  vendor: string;
  deviceType: string;
  IPAddress: string;
  articleNumber: string;
  MACAddress: string;
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
