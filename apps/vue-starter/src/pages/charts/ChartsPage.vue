<script setup lang="ts">
import { ref, shallowRef, onMounted, onUnmounted, nextTick } from 'vue';
import { IxContentHeader, IxTypography, IxButton } from '@siemens/ix-vue';
import { themeSwitcher } from '@siemens/ix';
import { registerTheme } from '@siemens/ix-echarts';
import * as echarts from 'echarts/core';
import { AgGridVue } from 'ag-grid-vue3';
import * as ag from 'ag-grid-community';
import { getIxTheme } from '@siemens/ix-aggrid';
import { buildChartOptions, CHART_SCATTER_DATA } from '../../shared';

registerTheme(echarts);

const ixTheme = getIxTheme(ag);

const CHART_TABLE_DATA = CHART_SCATTER_DATA.map(([hours, vibration]) => ({
  operatingHours: hours,
  vibration: vibration,
}));

const CHART_TABLE_COL_DEFS = [
  { field: 'operatingHours', headerName: 'Operating Hours (Pump A-102)', flex: 1, minWidth: 150 },
  { field: 'vibration', headerName: 'Vibration (mm/s)', flex: 1, minWidth: 150 },
];

const chartRef = ref<HTMLDivElement | null>(null);
const instance = shallowRef<echarts.ECharts | null>(null);
const showTable = ref(false);

function getEChartsThemeName(): string {
  const theme = themeSwitcher.getTheme();
  const colorSchema = themeSwitcher.getColorSchema();
  let mode = colorSchema;
  if (colorSchema === 'system') {
    mode = globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return `theme-${theme}-${mode}`;
}

function initChart() {
  if (!chartRef.value) return;
  const existingInstance = echarts.getInstanceByDom(chartRef.value);
  if (existingInstance) {
    existingInstance.dispose();
  }
  instance.value = echarts.init(chartRef.value, getEChartsThemeName());
  instance.value.setOption(buildChartOptions());
}

function handleThemeChange() {
  instance.value?.dispose();
  if (!chartRef.value) return;
  instance.value = echarts.init(chartRef.value, getEChartsThemeName());
  instance.value.setOption(buildChartOptions());
}

function handleResize() {
  instance.value?.resize();
}

function toggleView() {
  showTable.value = !showTable.value;
  if (!showTable.value) {
    nextTick(() => initChart());
  }
}

onMounted(() => {
  if (!chartRef.value) return;
  initChart();
  themeSwitcher.themeChanged.on(handleThemeChange);
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  themeSwitcher.themeChanged.off(handleThemeChange);
  window.removeEventListener('resize', handleResize);
  instance.value?.dispose();
});
</script>

<template>
  <div class="charts-page">
    <div class="page-header">
      <IxContentHeader header-title="Charts" />
      <IxButton variant="secondary" :aria-label="showTable ? 'Show as chart' : 'Show as data table'" @click="toggleView">
        {{ showTable ? 'Show as chart' : 'Show as data table' }}
      </IxButton>
    </div>
    <IxTypography format="body" class="description">
    Siemens Industrial Experience provides an
    <a href="https://echarts.apache.org" target="_blank" rel="noreferrer" aria-label="ECharts (opens in a new tab)">ECharts</a>
    theme. 
    <br />
    This lets you use different chart types in the Siemens Industrial Experience design
    system.
  </IxTypography>

  <IxTypography id="chart-title" format="label-lg" bold class="chart-title">
    Motor vibration analysis
  </IxTypography>

  <section v-if="showTable" class="table-container" aria-label="Chart data table">
    <AgGridVue
      :row-data="CHART_TABLE_DATA"
      :column-defs="CHART_TABLE_COL_DEFS"
      :suppress-movable-columns="true"
      dom-layout="autoHeight"
      :row-height="36"
      :theme="ixTheme"
      aria-label="Motor vibration data table"
    />
  </section>
  <figure
    v-else
    ref="chartRef"
    aria-labelledby="chart-title"
    class="chart-container"
  >
    <figcaption class="sr-only">Bar chart showing monthly production output</figcaption>
  </figure>
  </div>
</template>

<style scoped src="./ChartsPage.css"></style>
