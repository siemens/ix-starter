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
import { useI18n } from "vue-i18n";
import incidentsData from "./Incidents.json";
import IncidentList from "./IncidentList.vue";
import {
  IxTypography,
  IxInput,
  IxIcon,
  IxButton,
} from "@siemens/ix-vue";
import { iconSearch, iconCardLayout, iconList } from "@siemens/ix-icons/icons";
import { showDemoModal } from "@/helpers/modal";

const { t } = useI18n();
const incidents = ref(incidentsData);
const searchTerm = ref("");

const handleDemoModal = () => {
  showDemoModal(t);
};
</script>

<template>
  <section class="incidents">
    <IxTypography format="label" bold>{{ t('incidents.title') }}</IxTypography>
    <div class="search-and-filter">
      <IxInput :value="searchTerm" :placeholder="t('search')" type="text" aria-label="Filter devices"
        @valueChange="searchTerm = $event.detail">
        <IxIcon slot="start" :name="iconSearch" color="color-primary" size="16"></IxIcon>
      </IxInput>

      <div class="btn-group">
        <IxButton :icon="iconCardLayout" :outline="true" @click="handleDemoModal">{{ t('cards') }}</IxButton>
        <IxButton :icon="iconList">{{ t('list') }}</IxButton>
      </div>
    </div>
    <IncidentList :incidents="incidents" :search="searchTerm"></IncidentList>
  </section>
</template>

<style scoped>
.search-and-filter {
  display: flex;
  gap: 1rem;
  margin-block-end: 0.75rem;
  align-items: flex-end;
}

.search-and-filter :deep(ix-input-group) {
  max-width: 12.5rem;
}

.incidents {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  overflow: hidden;
}
</style>
