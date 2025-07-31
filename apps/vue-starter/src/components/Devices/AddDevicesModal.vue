/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

<script setup lang="ts">
import { ref } from "vue";
import { dismissModal } from "@siemens/ix";
import {
  type HTMLRefElement,
  IxButton,
  IxModalHeader,
  IxModalContent,
  IxModalFooter,
  IxSelect,
  IxSelectItem,
  IxInput,
  showToast,
} from "@siemens/ix-vue";
import { useDeviceStore } from "@/store/deviceStore";
import type { Device, DeviceState } from "@/types";
import { iconSingleCheck } from "@siemens/ix-icons/icons";

const modalRef = ref<HTMLRefElement<HTMLIxModalElement>>();
const deviceStore = useDeviceStore();

const device = ref<Omit<Device, "id">>({
  deviceName: "",
  vendor: "",
  deviceType: "",
  status: "Online" as DeviceState,
  articleNumber: "",
  macAddress: "",
  ipAddress: "",
  firmwareVersion: "",
  serialNumber: "",
});

const addDevice = () => {
  deviceStore.addDevice(device.value);

  device.value = {
    deviceName: "",
    vendor: "",
    deviceType: "",
    status: "Online" as DeviceState,
    articleNumber: "",
    macAddress: "",
    ipAddress: "",
    firmwareVersion: "",
    serialNumber: "",
  } as Omit<Device, "id">;

  dismissModal(modalRef.value as unknown as Element, "add-success");
  showToast({
    message: "Device successfully added",
    type: "success",
    icon: iconSingleCheck,
    iconColor: "color-success",
  });
};
const dismiss = () => {
  dismissModal(modalRef.value as unknown as Element, "dismiss payload");
};
</script>

<template>
  <div ref="modalRef" class="modal">
    <IxModalHeader @close="dismiss">Add device </IxModalHeader>
    <IxModalContent>
      <form id="modalForm" noValidate>
        <div class="form-grid">
          <IxInput id="device-name" v-model="device.deviceName" label="Device name" aria-label="Device name" />
          <IxInput id="vendor" v-model="device.vendor" label="Vendor" aria-label="Vendor" />
          <div class="device-type-container">
            <IxInput id="deviceType" v-model="device.deviceType" label="Device type" aria-label="Device type" />
          </div>

          <IxSelect id="status" label="Status" :value="device.status"
            @valueChange="device.status = $event.detail as DeviceState">
            <IxSelectItem value="Online" label="Online"></IxSelectItem>
            <IxSelectItem value="Offline" label="Offline"></IxSelectItem>
            <IxSelectItem value="Maintenance" label="Maintenance"></IxSelectItem>
            <IxSelectItem value="Error" label="Error"></IxSelectItem>
          </IxSelect>

          <IxInput id="articleNumber" v-model="device.articleNumber" label="Article number"
            aria-label="Article number" />
          <IxInput id="macAddress" v-model="device.macAddress" label="MAC address" />
          <IxInput id="ipAddress" v-model="device.ipAddress" label="IP address" />
          <IxInput id="firmwareVersion" v-model="device.firmwareVersion" label="Firmware version" />
          <IxInput id="serialNumber" v-model="device.serialNumber" label="Serial number" />
        </div>
      </form>
    </IxModalContent>
    <IxModalFooter class="footer">
      <IxButton outline @click="dismiss">Cancel</IxButton>
      <IxButton @click="addDevice">Add device</IxButton>
    </IxModalFooter>
  </div>
</template>

<style scoped>
.footer {
  margin-top: 1rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.device-type-container {
  grid-column: 1 / 3;
  width: 50%;
}

.flex-system {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.modal {
  width: 720px;
  max-width: 100%;
}
</style>
