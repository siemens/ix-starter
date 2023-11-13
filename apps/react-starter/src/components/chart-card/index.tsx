/*
 * SPDX-FileCopyrightText: 2022 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  IxCard,
  IxCardContent,
  IxCardTitle,
  IxIcon,
  IxTypography,
} from '@siemens/ix-react';
import bb, { area, line } from 'billboard.js';
import clsx from 'clsx';
import { useLayoutEffect, useRef } from 'react';
import styles from './chart-card.module.css';
import './chart.css';

function ChartCard(
  props: React.PropsWithChildren<{
    counter: number;
    icon: string;
    title: string;
    data: number[];
    secondary?: boolean;
    classNames?: string;
  }>
) {
  const chartRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const chartElement = chartRef.current;
    if (chartElement) {
      const chart = bb.generate({
        data: {
          columns: [
            ['data1', ...(props.data ?? [10, 50, 70, 90, 100])],
            ['data2', ...(props.data ?? [10, 50, 70, 90, 100])],
          ],
          types: {
            data1: area(),
            data2: line(),
          },
          color: (color, { id }) => {
            if (id === 'data1') {
              return 'transparent';
            }

            if (id === 'data2') {
              return 'var(--theme-color-dynamic--hover)';
            }
            return color;
          },
        },
        line: {
          classes: [styles.Line],
        },
        bindto: chartElement,
        legend: {
          show: false,
        },
        axis: {
          x: {
            show: false,
          },
          y: {
            show: false,
          },
        },
        tooltip: {
          show: false,
        },
        point: {
          show: false,
        },
        padding: {
          left: -8,
          right: -8,
          bottom: -8,
        },
        area: {
          below: true,
        },
      });

      chart.resize();
    }
  }, []);

  return (
    <IxCard
      className={clsx(styles.ChartCard, {
        [styles.Secondary]: props.secondary,
      })}
    >
      <IxCardContent style={{ height: 'calc(100% + 2rem)' }}>
        <IxCardTitle>
          <div className={styles.ChartCardTitle}>
            <IxIcon
              name={props.icon}
              size="32"
              class={styles.ChartChardTitle_Icon}
            ></IxIcon>
            <IxTypography format="h4">{props.title}</IxTypography>
          </div>
        </IxCardTitle>
        {props.children}
        <IxTypography className={styles.ChartCardCounter} format="display-xxl">
          {props.counter}
        </IxTypography>
      </IxCardContent>
      <div className={styles.ChartContainer} ref={chartRef}></div>
    </IxCard>
  );
}

export default ChartCard;
