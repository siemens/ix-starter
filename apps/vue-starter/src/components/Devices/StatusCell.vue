/*
* SPDX-FileCopyrightText: 2024 Siemens AG
*
* SPDX-License-Identifier: MIT
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

<script setup lang="ts">

import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { IxIcon, IxTypography } from "@siemens/ix-vue";
import { iconSuccess, iconInfo, iconMaintenanceWarning, iconError } from '@siemens/ix-icons/icons';
import type { DeviceState } from '@/types';

const { t } = useI18n();
const props = defineProps<{ params: { value: DeviceState } }>();

const statusValue = computed(() => props.params.value);

const iconConfig = computed(() => {
  switch (statusValue.value) {
    case "Online":
      return { name: iconSuccess, color: "color-success" };
    case "Offline":
      return { name: iconInfo };
    case "Maintenance":
      return { name: iconMaintenanceWarning, color: "color-warning" };
    default:
      return { name: iconError, color: "color-alarm" };
  }
});

const translatedStatus = computed(() => t(`device-status.${statusValue.value.toLowerCase()}`, statusValue.value));
</script>

<template>
  <div style="display: flex; align-items: center; gap: 0.5rem; height: 100%;">
    <IxIcon :name="iconConfig.name" :color="iconConfig.color" />
    <IxTypography>{{ translatedStatus }}</IxTypography>
  </div>
</template>