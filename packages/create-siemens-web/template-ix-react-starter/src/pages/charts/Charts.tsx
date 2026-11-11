import { useEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import { IxTypography, IxContentHeader, IxButton } from '@siemens/ix-react';
import { themeSwitcher } from '@siemens/ix';
import { registerTheme } from '@siemens/ix-echarts';
import * as echarts from 'echarts/core';
import { AgGridReact } from 'ag-grid-react';
import * as ag from 'ag-grid-community';
import { getIxTheme } from '@siemens/ix-aggrid';
import { buildChartOptions, CHART_SCATTER_DATA } from '../../shared';
import styles from './Charts.module.css';

registerTheme(echarts);

const ixTheme = getIxTheme(ag);

const CHART_TABLE_DATA = CHART_SCATTER_DATA.map(([hours, vibration]) => ({
  operatingHours: hours,
  vibration: vibration,
}));

const CHART_TABLE_COL_DEFS: ag.ColDef<{ operatingHours: number; vibration: number }>[] = [
  { field: 'operatingHours', headerName: 'Operating Hours (Pump A-102)', flex: 1, minWidth: 150 },
  { field: 'vibration', headerName: 'Vibration (mm/s)', flex: 1, minWidth: 150 },
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

function initChart(el: HTMLDivElement, instanceRef: MutableRefObject<echarts.ECharts | null>) {
  const orphan = echarts.getInstanceByDom(el);
  if (orphan) orphan.dispose();
  instanceRef.current = echarts.init(el, getEChartsThemeName());
  instanceRef.current.setOption(buildChartOptions());
}

function Charts() {
  const chartRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<echarts.ECharts | null>(null);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    if (showTable || !chartRef.current) return;

    const existingInstance = echarts.getInstanceByDom(chartRef.current);
    if (existingInstance) {
      existingInstance.dispose();
    }
    initChart(chartRef.current, instanceRef);
  }, [showTable]);

  useEffect(() => {
    if (!chartRef.current) return;

    const container = chartRef.current;

    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      if (width === 0 || height === 0) return;
      if (instanceRef.current) {
        instanceRef.current.resize();
      } else {
        initChart(container, instanceRef);
      }
    });

    observer.observe(container);

    const handleThemeChange = () => {
      if (!chartRef.current) return;
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
          onClick={() => setShowTable(!showTable)}
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
            suppressMovableColumns={true}
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
