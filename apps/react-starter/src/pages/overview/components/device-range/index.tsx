/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from "./styles.module.css";

import { useEChartsTheme } from "@/hooks/theme";
import { IxCard, IxCardContent, IxTypography } from "@siemens/ix-react";
import { BarSeriesOption } from "echarts";
import { EChartsCoreOption } from "echarts";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactEcharts from "echarts-for-react";
import { useResizeHandler } from "@/util/util.ts";
import EChartsReact from "echarts-for-react";
import { ECBasicOption } from "echarts/types/dist/shared";
import { getComputedCSSProperty } from "@siemens/ix-echarts";
import { Device, DeviceState } from "@/types";
import { useDataStore } from "@/store/device-store";

const reduceDevices = (devices: Device[]): BarSeriesOption[] => {
  const onlineData = new Map<string, number>();
  const offlineData = new Map<string, number>();
  const maintenanceData = new Map<string, number>();
  const errorData = new Map<string, number>();

  function fillData(device: Device, data: Map<string, number>, state: DeviceState) {
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
      type: "bar",
      stack: "x",
      color: getComputedCSSProperty("color-success"),
    },
    {
      name: "Maintenance",
      data: createSeries(maintenanceData),
      type: "bar",
      stack: "x",
      color: getComputedCSSProperty("color-warning"),
    },
    {
      name: "Error",
      data: createSeries(errorData),
      type: "bar",
      stack: "x",
      color: getComputedCSSProperty("color-alarm"),
    },
    {
      name: "Offline",
      data: createSeries(offlineData),
      type: "bar",
      stack: "x",
      color: getComputedCSSProperty("color-neutral"),
    },
  ];
};

function getOption(): EChartsCoreOption {
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

function DeviceRange() {
  const { t } = useTranslation();
  const chartRef = useRef<EChartsReact>(null);

  const [options, setOptions] = useState<ECBasicOption>({});

  const { devices } = useDataStore();
  const theme = useEChartsTheme();

  useEffect(() => {
    const chart = chartRef.current?.getEchartsInstance();

    if (chart) {
      const data = reduceDevices(devices);
      const option = {
        ...getOption(),
        series: data,
      };

      setOptions(option);
    }
  }, [devices]);

  useResizeHandler(chartRef);

  return (
    <IxCard className={styles.DeviceRange}>
      <IxCardContent>
        <IxTypography format="label" bold>
          {t("device-status.title")}
        </IxTypography>
        <ReactEcharts
          ref={chartRef}
          onChartReady={(echarts) => setTimeout(echarts.resize)}
          className={styles.echarts}
          option={options}
          theme={theme}
        />
      </IxCardContent>
    </IxCard>
  );
}

export default DeviceRange;
