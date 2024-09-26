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
      orient: "vertical",
      icon: "rect",
      right: "16",
      top: "center",
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
        radius: ["60%", "90%"],
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
  return (
    <IxCard>
      <IxCardContent>
        <IxTypography format="h3">Device status</IxTypography>
        <ReactEcharts
          onChartReady={(echarts) => setTimeout(echarts.resize)}
          className={styles.echarts}
          option={getOption()}
        />
      </IxCardContent>
    </IxCard>
  );
}

export default DeviceStatus;
