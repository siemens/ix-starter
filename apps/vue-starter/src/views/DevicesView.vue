/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
 
<script setup lang="ts">
import DevicesList from "../components/Devices/DevicesList.vue";
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { 
  IxPane, 
  IxTypography, 
  IxButton, 
  IxDivider, 
  IxSpinner 
} from "@siemens/ix-vue";
import { useDeviceStore } from "@/store/deviceStore";
import type { Device, DeviceState } from "@/types";

const { t } = useI18n();
const deviceStore = useDeviceStore();
const selectedData = ref<Device | null>(null);
const expanded = ref(false);
const closeByEscapeHandler = ref<((event: KeyboardEvent) => void) | null>(null);
const isMaintenanceLoading = ref(false);
const devicesListRef = ref<InstanceType<typeof DevicesList> | null>(null);

const categories = computed(() => {
  const devices = deviceStore.devices;
  if (!devices.length) return {};

  const keys = Object.keys(devices[0]);
  const categoryMap = {} as Record<string, { label: string; options: string[] }>;

  keys.forEach((key) => {
    const uniqueValues = Array.from(new Set(devices.map((device) => (device as any)[key] ?? "")));
    const kebabKey = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    let label = t(`device-details.${kebabKey}`);
    if (label === `device-details.${kebabKey}`) {
      label = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
    }
    categoryMap[key] = { label, options: uniqueValues };
  });

  return categoryMap;
});

const handleCellClicked = (payload: { expanded: boolean; data: Device }) => {
  selectedData.value = payload.data;
  expanded.value = false;
  nextTick(() => {
    expanded.value = true;
  });
};

const handlePaneExpandedChanged = (event: CustomEvent) => {
  expanded.value = event.detail.expanded;
};

const maintenanceButtonLabel = computed(() => {
  if (!selectedData.value) return t("device-details-footer.set-maintenance");
  if (selectedData.value.status === "Maintenance") return t("device-details-footer.end-maintenance");
  return t("device-details-footer.set-maintenance");
});

const filteredDeviceDetails = computed(() => {
  if (!selectedData.value) return {};
  return Object.keys(selectedData.value).reduce((acc, key) => {
    if (key !== "id") acc[key] = (selectedData.value as any)[key];
    return acc;
  }, {} as Record<string, any>);
});

const formatKey = (key: string) => {
  return categories.value[key]?.label || key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
};

const toggleMaintenance = async () => {
  if (!selectedData.value) return;
  isMaintenanceLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const newStatus: DeviceState = selectedData.value.status === "Maintenance" ? "Online" : "Maintenance";
  const updatedDevice: Device = { ...selectedData.value, status: newStatus };
  deviceStore.editDevice(updatedDevice);
  selectedData.value = updatedDevice;
  
  // Update the DataTable
  if (devicesListRef.value?.dataTableRef?.gridApi) {
    const api = devicesListRef.value.dataTableRef.gridApi;
    api.forEachNode((node) => {
      if (node.data && node.data.id === updatedDevice.id) {
        node.setData(updatedDevice);
      }
    });
  }
  isMaintenanceLoading.value = false;
};
onMounted(() => {
  deviceStore.fetchDevices();
  const closeByEscape = (event: KeyboardEvent) => {
    if (expanded.value && event.key === "Escape") expanded.value = false;
  };
  document.addEventListener("keydown", closeByEscape);
  closeByEscapeHandler.value = closeByEscape;
});

onUnmounted(() => {
  if (closeByEscapeHandler.value) {
    document.removeEventListener("keydown", closeByEscapeHandler.value);
  }
});
</script>

<template>
  <DevicesList @cell-clicked="handleCellClicked" ref="devicesListRef" />
  
  <IxPane 
    :heading="t('device-details-header.title')" 
    composition="right" 
    size="320px" 
    variant="floating" 
    hideOnCollapse
    :expanded="expanded" 
    class="pane-popup" 
    @expandedChanged="handlePaneExpandedChanged"
  >
    <div class="container">
      <div>
        <IxTypography format="h1" class="deviceName">
          {{ selectedData?.deviceName || 'No device selected' }}
        </IxTypography>
        <template v-if="selectedData">
          <template v-for="(value, key) in filteredDeviceDetails" :key="key">
            <div v-if="key !== 'id'">
              <IxTypography format="body" textColor="soft">
                {{ formatKey(key) }}
              </IxTypography>
              <IxTypography format="body" textColor="std">
                {{ value }}
              </IxTypography>
              <IxDivider class="divider" />
            </div>
          </template>
        </template>
      </div>
      <IxButton outline :disabled="isMaintenanceLoading" @click="toggleMaintenance">
        <div class="maintenance-button">
          <IxSpinner v-if="isMaintenanceLoading" size="small" />
          {{ maintenanceButtonLabel }}
        </div>
      </IxButton>
    </div>
  </IxPane>
</template>

<style scoped>
.pane-popup {
  position: fixed;
  right: 0;
  top: 44px;
  z-index: 1000;
  height: calc(100% - 44px);
}

.deviceName {
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 2rem;
}

.divider {
  margin: 0.5rem 0;
}

.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  word-break: break-word;
  padding: 0 0.75rem 1rem;
  box-sizing: border-box; 
}

.maintenance-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>