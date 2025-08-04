/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

<script setup lang="ts">
import { IxContentHeader } from "@siemens/ix-vue";
import DeviceRange from "../components/Overview/DeviceRange.vue";
import StatusHistory from "../components/Overview/StatusHistory.vue";
import IncidentHistory from "../components/Overview/IncidentHistory.vue";
import { useI18n } from "vue-i18n";
import { useIsMobileViewPort } from "../composables/useMediaQuery";
import { computed } from "vue";

const { t } = useI18n();
const isMobile = useIsMobileViewPort();

const containerClasses = computed(() => ({
  'h-100': !isMobile.value,
  'mobile-scroll': isMobile.value
}));
</script>

<template>
  <IxContentHeader slot="header" :headerTitle="t('content-header')"></IxContentHeader>
  <section class="list" :class="containerClasses">
    <div class="card-container">
      <DeviceRange></DeviceRange>
      <StatusHistory></StatusHistory>
    </div>
    <IncidentHistory />
  </section>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.list.h-100 {
  height: 100%;
  overflow: hidden;
}

.list.mobile-scroll {
  min-height: 100vh;
  overflow-y: auto;
}

.card-container {
  display: flex;
  gap: 1rem;
}

@media (max-width: 768px) {
  .card-container {
    flex-direction: column;
  }

  .mobile-scroll .card-container {
    gap: 1.5rem;
  }

  .mobile-scroll ix-card {
    min-height: 21rem;
    flex: none;
  }
}

ix-card {
  width: 100%;
  flex: 1;
}

ix-card+ix-card {
  flex: 2;
}
</style>
