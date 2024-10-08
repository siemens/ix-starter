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
import { Device } from "../../../../types/index.tsx";
import { useDataStore } from "../../../store/device-store.ts";
import ReactEcharts from "echarts-for-react";
import { useResizeHandler } from "@/util/util.ts";
import EChartsReact from "echarts-for-react";
import { ECBasicOption } from "echarts/types/dist/shared";

const reduceDevices = (devices: Device[]): BarSeriesOption[] => {
  const onlineData: [number, string][] = [];
  const offlineData: [number, string][] = [];
  const maintenanceData: [number, string][] = [];
  const errorData: [number, string][] = [];

  devices.forEach((device) => {
    const ipSegment = device.ipAddress.split(".")[0] + ".x";

    const online = onlineData.find((data) => data[1] === ipSegment);
    if (online) {
      online[0]++;
    } else {
      onlineData.push([1, ipSegment]);
    }

    const offline = offlineData.find((data) => data[1] === ipSegment);
    if (offline) {
      offline[0]++;
    } else {
      offlineData.push([1, ipSegment]);
    }

    const maintenance = maintenanceData.find((data) => data[1] === ipSegment);
    if (maintenance) {
      maintenance[0]++;
    } else {
      maintenanceData.push([1, ipSegment]);
    }

    const error = errorData.find((data) => data[1] === ipSegment);
    if (error) {
      error[0]++;
    } else {
      errorData.push([1, ipSegment]);
    }
  });

  return [
    {
      name: "Online",
      data: onlineData,
      type: "bar",
      stack: "x",
    },
    {
      name: "Maintenance",
      data: maintenanceData,
      type: "bar",
      stack: "x",
    },
    {
      name: "Error",
      data: errorData,
      type: "bar",
      stack: "x",
    },
    {
      name: "Offline",
      data: offlineData,
      type: "bar",
      stack: "x",
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
