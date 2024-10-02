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
import { useRef } from "react";
import { useResizeHandler } from "../../../../util/util.ts";
import EChartsReact from "echarts-for-react";

const seriesOnline = {
  name: "Online",
  color: [getComputedCSSProperty("color-success")],
  areaStyle: {
    color: getComputedCSSProperty("color-success"),
    opacity: 0.4,
  },
  data: [{ value: 60 }, { value: 75 }, { value: 100 }, { value: 60 }, { value: 75 }, { value: 60 }],
};

const seriesOffline = {
  name: "Offline",
  color: [getComputedCSSProperty("color-neutral")],
  areaStyle: {
    color: getComputedCSSProperty("color-neutral"),
    opacity: 0.4,
  },
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
  areaStyle: {
    color: getComputedCSSProperty("color-alarm"),
    opacity: 0.4,
  },
  data: [
    { value: 0 },
    { value: 17 },
    { value: -39 },
    { value: -60 },
    { value: -20 },
    { value: -2 },
  ],
};

function getOption() {
  return {
    legend: {
      orient: "horizontal",
      icon: "rect",
      left: "1",
      bottom: "1",
      textStyle: {
        color: getComputedCSSProperty("color-std-text"),
      },
    },
    xAxis: {
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    yAxis: {},
    series: [
      {
        type: "line",
        label: {
          show: false,
          color: getComputedCSSProperty("color-neutral"),
        },
        ...seriesOnline,
      },
      {
        type: "line",
        label: {
          show: false,
          color: getComputedCSSProperty("color-neutral"),
        },
        ...seriesErrors,
      },
      {
        type: "line",
        label: {
          show: false,
          color: getComputedCSSProperty("color-neutral"),
        },
        ...seriesOffline,
      },
    ],
  };
}

function StatusHistory() {
  const { t } = useTranslation();
  const chartRef = useRef<EChartsReact>(null);

  useResizeHandler(chartRef);

  return (
    <IxCard className="w-100">
      <IxCardContent>
        <IxTypography format="h3">{t("status-history.title")}</IxTypography>
        <ReactEcharts
          ref={chartRef}
          onChartReady={(echarts) => setTimeout(echarts.resize)}
          className={styles.echarts}
          option={getOption()}
        />
      </IxCardContent>
    </IxCard>
  );
}

export default StatusHistory;
