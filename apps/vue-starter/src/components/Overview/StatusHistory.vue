/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { themeSwitcher } from "@siemens/ix";
import { IxCard, IxCardContent, IxTypography } from "@siemens/ix-vue";
import { registerTheme, getComputedCSSProperty } from "@siemens/ix-echarts";
import type { EChartsOption } from "echarts";
import VueECharts from "vue-echarts";
import * as echarts from "echarts/core";
import * as charts from "echarts/charts";
import * as components from "echarts/components";
import * as renderer from "echarts/renderers";
import { useI18n } from "vue-i18n";
import { useChart } from "../../composables/useChart";
import { CHART_CONSTANTS, getStatusHistoryData } from "../../composables/chartConfig";

registerTheme(echarts);
echarts.use([
  components.TooltipComponent,
  components.LegendComponent,
  components.GridComponent,
  components.MarkLineComponent,
  charts.LineChart,
  renderer.CanvasRenderer,
]);

const { t } = useI18n();
const chartRef = ref();
const theme = ref(themeSwitcher.getCurrentTheme());
const chartData = getStatusHistoryData();


const chartOption = ref<EChartsOption>({ ...getChartOption() });

function getChartOption(): EChartsOption {
  const series = Object.values(chartData.series).map(seriesData => ({
    type: "line" as const,
    name: seriesData.name,
    color: getComputedCSSProperty(seriesData.colorKey),
    data: seriesData.data,
  }));
  return {
    grid: CHART_CONSTANTS.GRID.STATUS_HISTORY,
    legend: {
      orient: "horizontal" as const,
      icon: "rect" as const,
      left: "1",
      bottom: 0,
    },
    xAxis: {
      data: chartData.months,
      boundaryGap: false,
      splitLine: { show: true },
    },
    yAxis: {
      splitLine: { show: true },
    },
    series,
  };
}

function updateChartOption() {
  chartOption.value = { ...getChartOption() };
}


useChart({
  chartRef,
  initializeChart: async () => {
    updateChartOption();
  }
});


const themeChangeHandler = (newTheme: string) => {
  const root = document.documentElement;
  Array.from(root.classList)
    .filter(cls => cls.startsWith("theme-"))
    .forEach(cls => root.classList.remove(cls));
  root.classList.add(newTheme);
  theme.value = newTheme;
  updateChartOption();
};

themeSwitcher.themeChanged.on(themeChangeHandler);
onUnmounted(() => {
  themeSwitcher.themeChanged.off(themeChangeHandler);
});
</script>

<template>
  <IxCard class="status-history">
    <IxCardContent>
      <IxTypography format="label" bold>{{ t('status-history.title') }}</IxTypography>
      <VueECharts ref="chartRef" class="charts" :theme="theme" :option="chartOption" autoresize
        :init-options="{ renderer: CHART_CONSTANTS.RENDERER }" />
    </IxCardContent>
  </IxCard>
</template>

<style scoped>
.status-history {
  height: v-bind('CHART_CONSTANTS.DIMENSIONS.height');
  min-height: v-bind('CHART_CONSTANTS.DIMENSIONS.minHeight');
  max-height: v-bind('CHART_CONSTANTS.DIMENSIONS.maxHeight');
}

.charts {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 1rem;
}
</style>
