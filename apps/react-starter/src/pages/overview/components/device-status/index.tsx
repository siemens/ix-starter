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
import {useRef} from "react";
import {useResizeHandler} from "../../../../util/util.ts";
import EChartsReact from "echarts-for-react";

const data = [
  { value: 72.17, name: "Online" },
  { value: 15.42, name: "Error" },
  { value: 4.03, name: "Offline" },
  { value: 2.27, name: "Maintenance" },
];

function getOption() {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "horizontal",
      icon: "rect",
      bottom: "0",
      textStyle: {
        color: getComputedCSSProperty("color-std-text"),
      },
    },
    series: [
      {
        name: "OS Share",
        type: "pie",
        color: [
          getComputedCSSProperty("color-success"),
          getComputedCSSProperty("color-alarm"),
          getComputedCSSProperty("color-neutral"),
          getComputedCSSProperty("color-critical"),
        ],
        radius: ["50%", "70%"],
        label: {
          show: false,
          color: getComputedCSSProperty("color-neutral"),
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 25,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
      },
    ],
  };
}

function DeviceStatus() {
  const { t } = useTranslation();
  const chartRef = useRef<EChartsReact>(null);

  useResizeHandler(chartRef);

  return (
    <IxCard className="w-100">
      <IxCardContent>
        <IxTypography format="h3">{t("device-status.title")}</IxTypography>
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

export default DeviceStatus;
