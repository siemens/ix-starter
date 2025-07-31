/* * SPDX-FileCopyrightText: 2024 Siemens AG * * SPDX-License-Identifier: MIT * * This source code
is licensed under the MIT license found in the * LICENSE file in the root directory of this source
tree. */

<script setup lang="ts">
import { ref } from "vue";
import { dismissModal } from "@siemens/ix";
import {
  type HTMLRefElement,
  IxButton,
  IxModalHeader,
  IxModalContent,
  IxModalFooter,
  showToast,
} from "@siemens/ix-vue";
import { useDeviceStore } from "@/store/deviceStore";
import type { Device } from "@/types";
import { iconSingleCheck, iconError, iconTrashcan } from "@siemens/ix-icons/icons";

// Make the device prop optional with a default value
const props = withDefaults(
  defineProps<{
    device?: Device;
  }>(),
  {
    device: undefined,
  },
);

const modalRef = ref<HTMLRefElement<HTMLIxModalElement>>();
const deviceStore = useDeviceStore();

const deleteDevice = () => {
  if (!props.device) {
    console.error("No device provided to delete");
    showToast({
      message: "Error: No device selected for deletion",
      type: "error",
      icon: iconError,
      iconColor: "color-alarm",
    });
    dismiss();
    return;
  }

  try {
    deviceStore.deleteDevice(props.device);

    dismissModal(modalRef.value as unknown as Element, "delete-success");
    showToast({
      message: "Device successfully deleted",
      type: "success",
      icon: iconSingleCheck,
      iconColor: "color-success",
    });
  } catch (error) {
    console.error("Error deleting device:", error);
    showToast({
      message: "Failed to delete device",
      type: "error",
      icon: iconError,
      iconColor: "color-alarm",
    });
    dismiss();
  }
};

const dismiss = () => {
  dismissModal(modalRef.value as unknown as Element, "dismiss payload");
};
</script>

<template>
  <div ref="modalRef" class="modal">
    <IxModalHeader class="header" :icon="iconTrashcan" iconColor="color-alarm" @close="dismiss">
      Delete device?</IxModalHeader
    >
    <IxModalContent>
      <div class="delete-content">Do you really want to delete the device?</div>
    </IxModalContent>
    <IxModalFooter class="footer">
      <IxButton variant="secondary" outline @click="dismiss">Cancel</IxButton>
      <IxButton variant="danger" :disabled="!props.device" @click="deleteDevice"
        >Delete device</IxButton
      >
    </IxModalFooter>
  </div>
</template>

<style scoped>
.header {
  gap: 1rem;
}

.delete-content {
  margin-left: 48px;
}

.footer {
  margin-left: 40px;
  padding: 0.5rem 0.5rem 0.5rem;
}

.modal {
  width: 500px;
  max-width: 100%;
}
</style>
