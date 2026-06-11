import { themeSwitcher } from '@siemens/ix';
import { getIxTheme } from '@siemens/ix-aggrid';
import { registerTheme } from '@siemens/ix-echarts';
import { IxButton, IxContentHeader, IxTypography } from '@siemens/ix-react';
import * as ag from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as echarts from 'echarts/core';
import { useEffect, useRef, useState } from 'react';

import { CHART_SCATTER_DATA, buildChartOptions } from '../../shared';
import styles from './Charts.module.css';

registerTheme(echarts);

const ixTheme = getIxTheme(ag);

const CHART_TABLE_DATA = CHART_SCATTER_DATA.map(([hours, vibration]) => ({
  operatingHours: hours,
  vibration,
}));

const CHART_TABLE_COL_DEFS: ag.ColDef<{ operatingHours: number; vibration: number }>[] = [
  { field: 'operatingHours', flex: 1, headerName: 'Operating Hours (Pump A-102)', minWidth: 150 },
  { field: 'vibration', flex: 1, headerName: 'Vibration (mm/s)', minWidth: 150 },
];

function getEChartsThemeName(): string {
  const theme = themeSwitcher.getTheme();
  const colorSchema = themeSwitcher.getColorSchema();
  let mode = colorSchema;
  if (colorSchema === 'system') {
    mode = globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return `theme-${theme}-${mode}`;
}

type ChartInstanceRef = {
  current: echarts.ECharts | null;
};

function initChart(el: HTMLDivElement, instanceRef: ChartInstanceRef) {
  const orphan = echarts.getInstanceByDom(el);
  if (orphan) {
    orphan.dispose();
  }
  instanceRef.current = echarts.init(el, getEChartsThemeName());
  instanceRef.current.setOption(buildChartOptions());
}

function Charts() {
  const chartRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<echarts.ECharts | null>(null);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    if (showTable || !chartRef.current) {
      return;
    }

    const existingInstance = echarts.getInstanceByDom(chartRef.current);
    if (existingInstance) {
      existingInstance.dispose();
    }
    initChart(chartRef.current, instanceRef);
  }, [showTable]);

  useEffect(() => {
    if (!chartRef.current) {
      return undefined;
    }

    const container = chartRef.current;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width === 0 || height === 0) {
        return;
      }
      if (instanceRef.current) {
        instanceRef.current.resize();
      } else {
        initChart(container, instanceRef);
      }
    });

    observer.observe(container);

    const handleThemeChange = () => {
      if (!chartRef.current) {
        return;
      }
      initChart(chartRef.current, instanceRef);
    };

    themeSwitcher.themeChanged.on(handleThemeChange);

    const instance = instanceRef.current;
    return () => {
      observer.disconnect();
      themeSwitcher.themeChanged.off(handleThemeChange);
      instance?.dispose();
    };
  }, []);

  return (
    <div className={styles.chartsPage}>
      <div className={styles.pageHeader}>
        <IxContentHeader headerTitle="Charts" />
        <IxButton
          variant="secondary"
          aria-label={showTable ? 'Show as chart' : 'Show as data table'}
          onClick={() => {
            setShowTable(!showTable);
          }}
        >
          {showTable ? 'Show as chart' : 'Show as data table'}
        </IxButton>
      </div>
      <IxTypography format="body" className={styles.description}>
        Siemens Industrial Experience provides an{' '}
        <a
          href="https://echarts.apache.org"
          target="_blank"
          rel="noreferrer"
          aria-label="ECharts (opens in a new tab)"
        >
          ECharts
        </a>{' '}
        theme.
        <br />
        This lets you use different chart types in the Siemens Industrial Experience design system.
      </IxTypography>

      <IxTypography id="chart-title" format="label-lg" bold className={styles.chartTitle}>
        Motor vibration analysis
      </IxTypography>

      {showTable ? (
        <section className={styles.tableContainer} aria-label="Chart data table">
          <AgGridReact
            rowData={CHART_TABLE_DATA}
            columnDefs={CHART_TABLE_COL_DEFS}
            suppressMovableColumns
            domLayout="autoHeight"
            rowHeight={36}
            theme={ixTheme}
            aria-label="Motor vibration data table"
          />
        </section>
      ) : (
        <figure ref={chartRef} aria-labelledby="chart-title" className={styles.chartContainer}>
          <figcaption className="sr-only">Bar chart showing monthly production output</figcaption>
        </figure>
      )}
    </div>
  );
}

export default Charts;
