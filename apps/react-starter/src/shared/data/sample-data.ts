/**
 * Sample data for demo purposes across apps
 */

export const CHART_SCATTER_DATA = [
  [0, 300],
  [600, 1500],
  [1200, 1400],
  [1800, 1300],
  [2350, 0],
  [2900, 200],
  [3500, 2000],
];

export const CHART_X_AXIS = {
  interval: 500,
  max: 3500,
  min: 0,
  name: 'Operating hours',
  nameGap: 36,
  nameLocation: 'middle' as const,
  type: 'value' as const,
};

export const CHART_Y_AXIS = {
  interval: 500,
  max: 2500,
  min: 0,
  name: 'Vibration (mm/s)',
  type: 'value' as const,
};

export interface GridRowData {
  series: string;
  model: string;
  quantity: number;
}

export const GRID_ROW_DATA: GridRowData[] = [
  { model: 'S7-1500', quantity: 32, series: 'SIMATIC' },
  { model: 'CMS1200', quantity: 16, series: 'SIPLUS' },
  { model: 'S7-1200', quantity: 41, series: 'SIMATIC' },
  { model: 'S7-1500V', quantity: 32, series: 'SIMATIC' },
  { model: 'ET 200pro', quantity: 52, series: 'SIMATIC' },
  { model: '828D', quantity: 73, series: 'SINUMERIK' },
];

export const GRID_COL_DEFS: {
  field: keyof GridRowData;
  headerName: string;
  flex: number;
  type?: string;
  minWidth?: number;
}[] = [
  { field: 'series', flex: 1, headerName: 'Series', minWidth: 120 },
  { field: 'model', flex: 1, headerName: 'Model', minWidth: 120 },
  { field: 'quantity', flex: 1, headerName: 'Quantity', minWidth: 100, type: 'rightAligned' },
];

export function buildChartOptions() {
  return {
    grid: { bottom: 90, left: 60, right: 30, top: 30 },
    legend: {
      bottom: '0',
      left: 'center',
      show: true,
    },
    series: [
      {
        name: 'Pump A-102',
        type: 'line' as const,
        data: CHART_SCATTER_DATA,
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: { borderWidth: 0 },
        smooth: false,
      },
    ],
    tooltip: {
      axisPointer: {
        label: { show: false },
        type: 'cross' as const,
      },
      backgroundColor: 'var(--theme-color-1)',
      borderColor: 'var(--theme-color-soft-bdr)',
      formatter: (params: unknown) => {
        const p = Array.isArray(params) ? params[0] : params;
        const marker = p.marker ?? '';
        const xVal = p.value[0];
        const yVal = p.value[1];
        return `${marker} <b>${p.seriesName}</b><br/>Operating hours: ${xVal}<br/>Vibration: ${yVal} mm/s`;
      },
      textStyle: {
        color: 'var(--theme-color-std-text)',
      },
      trigger: 'axis' as const,
    },
    xAxis: CHART_X_AXIS,
    yAxis: CHART_Y_AXIS,
  };
}
