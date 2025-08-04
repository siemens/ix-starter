/* * SPDX-FileCopyrightText: 2024 Siemens AG * * SPDX-License-Identifier: MIT * * This source code
is licensed under the MIT license found in the * LICENSE file in the root directory of this source
tree. */

<script setup lang="ts">
import {
  IxRow,
  IxIconButton,
  IxTooltip,
  IxDropdown,
  IxDropdownQuickActions,
  IxDropdownItem,
  IxDivider,
  showToast,
} from "@siemens/ix-vue";
import {
  iconPen,
  iconTrashcan,
  iconContextMenu,
  iconDuplicate,
  iconCut,
  iconCopy,
  iconPaste,
  iconRename,
  iconPcTower,
  iconSingleCheck,
} from "@siemens/ix-icons/icons";
import { useDeviceStore } from "@/store/deviceStore";
import { showDeleteMessage, showModal } from "@/helpers/modal";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import type { GridApi, IRowNode } from "ag-grid-community";
import type { Device, DeviceState } from "@/types";
import DeleteDevicesModal from "./DeleteDevicesModal.vue";

const { t } = useI18n();

const deviceStore = useDeviceStore();

const handleDelete = async () => {
  const result = await showDeleteMessage(t);

  if (result.actionId === "okay") {
    deviceStore.deleteDevice(props.params.node.data);
    showToast({
      message: t("dropdown-quick-actions.success-messages.delete"),
      type: "success",
      icon: iconSingleCheck,
      iconColor: "color-success",
    });
  }
};

const props = defineProps<{
  params: {
    api: GridApi<Device>;
    node: IRowNode<Device> & { data: Device };
  };
}>();

const startEditingFirstCell = () => {
  console.log(props.params.node.data);
  props.params.api.startEditingCell({
    rowIndex: props.params.node.rowIndex as number,
    colKey: "deviceName",
  });
};

const toggleStatusLabel = computed(() => {
  return props.params.node.data.status === "Online"
    ? t("dropdown-quick-actions.off")
    : t("dropdown-quick-actions.on");
});

const toggleStatus = () => {
  const newStatus: DeviceState = props.params.node.data.status === "Online" ? "Offline" : "Online";
  const updatedDevice: Device = {
    ...props.params.node.data,
    status: newStatus,
  };
  deviceStore.editDevice(updatedDevice);
  props.params.node.setData(updatedDevice);
  props.params.api.refreshCells({
    force: true,
    rowNodes: [props.params.node],
    columns: ["status"],
  });
};

const duplicateRow = () => {
  const currentIndex = deviceStore.devices.findIndex((d) => d.id === props.params.node.data.id);

  const newDevice = {
    ...props.params.node.data,
    id: (deviceStore.devices.length + 1).toString(),
  };

  deviceStore.insertDevice(currentIndex + 1, newDevice);

  showToast({
    message: t("dropdown-quick-actions.success-messages.duplicate"),
    type: "success",
    icon: iconSingleCheck,
    iconColor: "color-success",
  });
};

const copyRow = () => {
  navigator.clipboard.writeText(JSON.stringify(props.params.node.data));
  showToast({
    message: t("dropdown-quick-actions.success-messages.copy"),
    type: "success",
    icon: iconSingleCheck,
    iconColor: "color-success",
  });
};

const pasteRow = async () => {
  try {
    const text = await navigator.clipboard.readText();
    const data = JSON.parse(text);
    const currentIndex = deviceStore.devices.findIndex((d) => d.id === props.params.node.data.id);

    deviceStore.insertDevice(currentIndex + 1, {
      ...data,
      id: (deviceStore.devices.length + 1).toString(),
    });
    showToast({
      message: t("dropdown-quick-actions.success-messages.paste"),
      type: "success",
      icon: iconSingleCheck,
      iconColor: "color-success",
    });
  } catch (error) {
    console.error("Error pasting device:", error);
  }
};

const deleteDeviceClick = async () => {
  await showModal(DeleteDevicesModal, "360", {
    device: props.params.node.data,
  });
};

const copyAndDeleteRow = () => {
  copyRow();
  handleDelete();
  showToast({
    message: t("dropdown-quick-actions.success-messages.cut"),
    type: "success",
    icon: iconSingleCheck,
    iconColor: "color-success",
  });
};
</script>

<template>
  <IxRow class="quick-actions-row">
    <IxIconButton
      :class="'edit-tooltip-' + props.params.node?.rowIndex"
      :aria-describedby="'tooltip-edit-' + props.params.node?.rowIndex"
      :icon="iconPen"
      variant="secondary"
      ghost
      @click="startEditingFirstCell"
    />
    <IxTooltip
      :id="'tooltip-edit-' + props.params.node?.rowIndex"
      :for="'.edit-tooltip-' + props.params.node?.rowIndex"
    >
      {{ t("dropdown-quick-actions.rename") }}
    </IxTooltip>

    <IxIconButton
      :class="'delete-tooltip-' + props.params.node?.rowIndex"
      :aria-describedby="'tooltip-delete-' + props.params.node?.rowIndex"
      :icon="iconTrashcan"
      variant="secondary"
      ghost
      @click="deleteDeviceClick"
    />
    <IxTooltip
      :id="'tooltip-delete-' + props.params.node?.rowIndex"
      :for="'.delete-tooltip-' + props.params.node?.rowIndex"
    >
      {{ t("dropdown-quick-actions.delete") }}
    </IxTooltip>
    <IxIconButton
      :id="`devices-${props.params.node?.rowIndex}`"
      :icon="iconContextMenu"
      variant="secondary"
      ghost
    >
    </IxIconButton>
    <IxDropdown :trigger="`devices-${props.params.node?.rowIndex}`">
      <IxDropdownQuickActions>
        <IxIconButton :icon="iconDuplicate" ghost @click="duplicateRow"></IxIconButton>
        <IxIconButton :icon="iconCut" ghost @click="copyAndDeleteRow"></IxIconButton>
        <IxIconButton :icon="iconCopy" ghost @click="copyRow"></IxIconButton>
        <IxIconButton :icon="iconPaste" ghost @click="pasteRow"></IxIconButton>
      </IxDropdownQuickActions>
      <IxDivider></IxDivider>
      <IxDropdownItem
        :icon="iconRename"
        :label="t('dropdown-quick-actions.rename')"
        @click="startEditingFirstCell"
      >
      </IxDropdownItem>
      <IxDropdownItem
        :icon="iconPcTower"
        :label="toggleStatusLabel"
        @click="toggleStatus"
      ></IxDropdownItem>
      <IxDivider />
      <IxDropdownItem
        :icon="iconTrashcan"
        :label="t('dropdown-quick-actions.delete')"
        @click="deleteDeviceClick"
      >
      </IxDropdownItem>
    </IxDropdown>
  </IxRow>
</template>

<style scoped>
.quick-actions-row {
  display: flex;
  gap: 0.5rem;
}
</style>
