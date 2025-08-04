/*
* SPDX-FileCopyrightText: 2024 Siemens AG
*
* SPDX-License-Identifier: MIT
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

<script setup lang="ts">

import { iconProject } from "@siemens/ix-icons/icons";
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import { IxEmptyState } from "@siemens/ix-vue";
import QuickActions from "./QuickActions.vue";
import StatusCell from "./StatusCell.vue";
import { useDeviceStore } from "@/store/deviceStore";
import { useI18n } from "vue-i18n";
import type { Device, DeviceState } from "@/types";
import type { GridApi, IRowNode, ColDef, GridReadyEvent, CellClickedEvent } from "ag-grid-community";

interface Props {
  filterText: string;
  selectedStatus: string | null;
  selectedCategory: Record<string, string | null>;
}

interface Emits {
  (e: "cell-clicked", payload: { expanded: boolean; data: Device }): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const { t } = useI18n();

const deviceStore = useDeviceStore();
const gridApi = ref<GridApi | null>(null);
const showEmptyState = ref(false);

const rowData = computed(() => deviceStore.devices);

const columnDefs = computed<ColDef[]>(() => [
  {
    field: "deviceName",
    headerName: t("device-details.device-name"),
    editable: true,
    flex: 2,
    minWidth: 150,
  },
  {
    field: "status",
    headerName: t("device-details.status"),
    editable: true,
    flex: 1,
    minWidth: 150,
    cellRenderer: StatusCell,
    cellRendererParams: (params: { data: Device }) => ({ rowData: params.data }),
  },
  {
    field: "vendor",
    headerName: t("device-details.vendor"),
    editable: true,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "deviceType",
    headerName: t("device-details.device-type"),
    editable: true,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "ipAddress",
    headerName: t("device-details.ip-address"),
    editable: true,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "quickActions",
    headerName: t("quick-actions.title"),
    maxWidth: 150,
    cellRenderer: QuickActions,
    cellStyle: { display: "flex", alignItems: "center" },
    cellRendererParams: (params: { api: GridApi<Device>; node: IRowNode<Device>; data: Device }) => ({
      api: params.api,
      node: params.node,
      rowData: params.data,
    }),
  },
]);

const categories = computed(() => {
  if (rowData.value.length === 0) return {};

  const categoryMap: Record<string, { label: string; options: string[] }> = {};

  columnDefs.value.forEach((col) => {
    if (col.field && col.headerName && col.field !== "quickActions") {
      const uniqueValues = [
        ...new Set(
          rowData.value
            .map((device) => device[col.field as keyof Device]?.toString() || "")
            .filter(Boolean),
        ),
      ];

      categoryMap[col.field] = {
        label: col.headerName,
        options: uniqueValues,
      };
    }
  });

  return categoryMap;
});

const deviceState = computed(() => {
  const status: Record<DeviceState, number> = {
    Error: 0,
    Maintenance: 0,
    Offline: 0,
    Online: 0,
  };

  rowData.value.forEach((device) => {
    status[device.status] = (status[device.status] || 0) + 1;
  });
  return status;
});

const isExternalFilterPresent = (): boolean => true;

const doesExternalFilterPass = (node: IRowNode<Device>): boolean => {
  const device = node.data;
  if (!device) return false;

  if (props.selectedStatus && device.status !== props.selectedStatus) {
    return false;
  }

  for (const [field, value] of Object.entries(props.selectedCategory)) {
    if (value && device[field as keyof Device] !== value) {
      return false;
    }
  }

  if (props.filterText) {
    const searchText = props.filterText.toLowerCase();
    const searchableFields: (keyof Device)[] = [
      "deviceName",
      "vendor",
      "deviceType",
      "ipAddress",
      "articleNumber",
      "macAddress",
      "firmwareVersion",
      "serialNumber",
    ];
    const matches = searchableFields.some((field) =>
      String(device[field] || "")
        .toLowerCase()
        .includes(searchText),
    );
    if (!matches) return false;
  }

  return true;
};


const onGridReady = (params: GridReadyEvent<Device>) => {
  gridApi.value = params.api;
  nextTick(() => {
    updateEmptyState();
  });
};

const onCellClicked = (event: CellClickedEvent<Device>) => {
  if (event.data) {
    emit("cell-clicked", { expanded: true, data: event.data });
    event.api.refreshCells({ rowNodes: [event.node] });
  }
};

const refreshData = () => {
  gridApi.value?.refreshCells();
  gridApi.value?.redrawRows();
};

const updateEmptyState = () => {
  if (gridApi.value) {
    showEmptyState.value = gridApi.value.getDisplayedRowCount() === 0;
  }
};

watch(
  [() => props.selectedStatus, () => props.selectedCategory, () => props.filterText],
  () => {
    if (gridApi.value) {
      gridApi.value.onFilterChanged();
      nextTick(updateEmptyState);
    }
  },
  { deep: true },
);

onMounted(() => {
  deviceStore.fetchDevices();
});

defineExpose({ categories, deviceState, refreshData, gridApi });
</script>

<template>
  <div class="ag-grid-container">
    <AgGridVue class="ag-theme-alpine-dark ag-theme-ix" style="width: 100%; height: 100%" :columnDefs="columnDefs"
      :rowData="rowData" :rowHeight="42" :frameworkComponents="{ QuickActions }" :suppressRowTransform="true"
      :suppressCellFocus="true" :animateRows="true" :suppressAnimationFrame="false" :isExternalFilterPresent="isExternalFilterPresent"
      :doesExternalFilterPass="doesExternalFilterPass" rowSelection="single"
      @grid-ready="onGridReady" @cell-clicked="onCellClicked" />

    <div v-if="showEmptyState" class="empty-state">
      <IxEmptyState :header="t('device-quick-actions.devices')" :sub-header="t('category-filter.placeholder')"
        :icon="iconProject" :action="t('cancel')" />
    </div>
  </div>
</template>

<style scoped>
.ag-grid-container {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
