/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
 
<script setup lang="ts">
import { ref, watch, type Ref } from "vue";
import { themeSwitcher } from "@siemens/ix";
import { IxCard, IxCardContent, IxTypography } from "@siemens/ix-vue";
import { registerTheme, getComputedCSSProperty } from "@siemens/ix-echarts";
import type { EChartsOption, BarSeriesOption } from "echarts";
import type { Device } from "@/types";
import VueECharts from "vue-echarts";
import * as echarts from "echarts/core";
import * as charts from "echarts/charts";
import * as components from "echarts/components";
import * as renderer from "echarts/renderers";
import { useI18n } from "vue-i18n";
import { useDeviceStore } from "@/store/deviceStore";
import { useChart } from "../../composables/useChart";

registerTheme(echarts);
echarts.use([
  components.TooltipComponent,
  components.LegendComponent,
  components.GridComponent,
  components.MarkLineComponent,
  charts.BarChart,
  renderer.CanvasRenderer,
]);

const { t } = useI18n();
const deviceStore = useDeviceStore();
const chartRef = ref() as Ref<InstanceType<typeof VueECharts> | undefined>;
const theme = ref(themeSwitcher.getCurrentTheme());
const barChartOption = ref<EChartsOption>({
  ...getOption(),
  series: [] as BarSeriesOption[],
});

const initializeChart = async () => {
  await deviceStore.fetchDevices();
  prepareChartOptions();
};

useChart({
  chartRef,
  initializeChart,
});

function reduceDevices(devices: Device[]): BarSeriesOption[] {
  const onlineData = new Map<string, number>();
  const offlineData = new Map<string, number>();
  const maintenanceData = new Map<string, number>();
  const errorData = new Map<string, number>();

  function fillData(device: Device, data: Map<string, number>, state: string) {
    const ipSegment = device.ipAddress.split(".")[0] + ".x";

    if (device.status !== state) {
      return;
    }

    if (data.has(ipSegment)) {
      data.set(ipSegment, data.get(ipSegment)! + 1);
    } else {
      data.set(ipSegment, 1);
    }
  }

  devices.forEach((device) => {
    fillData(device, onlineData, "Online");
    fillData(device, maintenanceData, "Maintenance");
    fillData(device, errorData, "Error");
    fillData(device, offlineData, "Offline");
  });

  function createSeries(data: Map<string, number>) {
    return Array.from(data).map(([name, value]) => [value, name]);
  }

  return [
    {
      name: "Online",
      data: createSeries(onlineData),
      type: "bar" as const,
      stack: "x",
      color: getComputedCSSProperty("color-success"),
    },
    {
      name: "Maintenance",
      data: createSeries(maintenanceData),
      type: "bar" as const,
      stack: "x",
      color: getComputedCSSProperty("color-warning"),
    },
    {
      name: "Error",
      data: createSeries(errorData),
      type: "bar" as const,
      stack: "x",
      color: getComputedCSSProperty("color-alarm"),
    },
    {
      name: "Offline",
      data: createSeries(offlineData),
      type: "bar" as const,
      stack: "x",
      color: getComputedCSSProperty("color-neutral"),
    },
  ];
}

function getOption(): EChartsOption {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "horizontal",
      icon: "rect",
      bottom: "0",
      left: "0",
    },
    xAxis: {
      type: "value",
      name: "Devices",
      nameLocation: "middle",
      nameGap: 25,
    },
    yAxis: {
      type: "category",
      name: "IP Range",
      nameLocation: "end",
    },
    grid: {
      top: 45,
      bottom: 85,
    },
  };
}

function prepareChartOptions() {
  const data = reduceDevices(deviceStore.devices);
  barChartOption.value = {
    ...getOption(),
    series: data,
  };
}

watch(() => deviceStore.devices, prepareChartOptions, { deep: true });
watch(theme, prepareChartOptions);

themeSwitcher.themeChanged.on((newTheme: string) => {
  theme.value = newTheme;
});
</script>

<template>
  <IxCard class="device-range">
    <IxCardContent>
      <IxTypography format="label" bold>{{ t('device-status.title') }}</IxTypography>
      <VueECharts ref="chartRef" class="charts" :theme="theme" :option="barChartOption" autoresize
        :init-options="{ renderer: 'canvas' }" />
    </IxCardContent>
  </IxCard>
</template>

<style scoped>
.device-range {
  height: 21rem;
  min-height: 21rem;
  max-height: 21rem;
}

.charts {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
