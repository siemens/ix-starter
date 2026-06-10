/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from "./styles.module.css";

import { IxCard, IxCardContent, IxTypography } from "@siemens/ix-react";
import { getComputedCSSProperty } from "@siemens/ix-echarts";
import ReactEcharts from "echarts-for-react";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { useResizeHandler } from "../../../../util/util.ts";
import EChartsReact from "echarts-for-react";
import { useEChartsTheme } from "@/hooks/theme.ts";
import { ECBasicOption } from "echarts/types/dist/shared";

const seriesOnline = {
  name: "Online",
  color: [getComputedCSSProperty("color-success")],
  data: [{ value: 60 }, { value: 75 }, { value: 100 }, { value: 60 }, { value: 75 }, { value: 60 }],
};

const seriesOffline = {
  name: "Offline",
  color: [getComputedCSSProperty("color-neutral")],
  data: [
    { value: -30 },
    { value: -62 },
    { value: -25 },
    { value: -61 },
    { value: -99 },
    { value: -60 },
  ],
};

const seriesErrors = {
  name: "Errors",
  color: getComputedCSSProperty("color-alarm"),
  data: [
    { value: 0 },
    { value: 17 },
    { value: -39 },
    { value: -60 },
    { value: -20 },
    { value: -2 },
  ],
};

const seriesMaintenance = {
  name: "Maintenance",
  color: getComputedCSSProperty("color-warning"),
  data: [{ value: 0 }, { value: 2 }, { value: -90 }, { value: -85 }, { value: -3 }, { value: -1 }],
};

function getOption(): ECBasicOption {
  return {
    grid: {
      top: 10,
      bottom: 85,
      left: 40,
      right: 10,
    },
    legend: {
      orient: "horizontal",
      icon: "rect",
      left: "1",
      bottom: -0,
    },
    xAxis: {
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      boundaryGap: false, // Ensure the first label starts at the beginning
      splitLine: {
        show: true,
      },
    },
    yAxis: {
      splitLine: {
        show: true,
      },
    },
    series: [
      {
        type: "line",
        ...seriesOnline,
      },
      {
        type: "line",
        ...seriesMaintenance,
      },
      {
        type: "line",
        ...seriesErrors,
      },
      {
        type: "line",
        ...seriesOffline,
      },
    ],
  };
}

function StatusHistory() {
  const { t } = useTranslation();
  const [option] = useState<ECBasicOption>(getOption());
  const chartRef = useRef<EChartsReact>(null);
  const theme = useEChartsTheme();
  useResizeHandler(chartRef);

  return (
    <IxCard className={styles.StatusHistory}>
      <IxCardContent>
        <IxTypography format="label" bold>
          {t("status-history.title")}
        </IxTypography>
        <ReactEcharts
          ref={chartRef}
          onChartReady={(echarts) => setTimeout(echarts.resize)}
          className={styles.echarts}
          option={option}
          theme={theme}
        />
      </IxCardContent>
    </IxCard>
  );
}

export default StatusHistory;
