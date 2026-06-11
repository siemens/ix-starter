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
  type: 'value' as const,
  min: 0,
  max: 3500,
  interval: 500,
  name: 'Operating hours',
  nameLocation: 'middle' as const,
  nameGap: 36,
};

export const CHART_Y_AXIS = {
  type: 'value' as const,
  min: 0,
  max: 2500,
  interval: 500,
  name: 'Vibration (mm/s)',
};

export interface GridRowData {
  series: string;
  model: string;
  quantity: number;
}

export const GRID_ROW_DATA: GridRowData[] = [
  { series: 'SIMATIC', model: 'S7-1500', quantity: 32 },
  { series: 'SIPLUS', model: 'CMS1200', quantity: 16 },
  { series: 'SIMATIC', model: 'S7-1200', quantity: 41 },
  { series: 'SIMATIC', model: 'S7-1500V', quantity: 32 },
  { series: 'SIMATIC', model: 'ET 200pro', quantity: 52 },
  { series: 'SINUMERIK', model: '828D', quantity: 73 },
];

export const GRID_COL_DEFS: {
  field: keyof GridRowData;
  headerName: string;
  flex: number;
  type?: string;
  minWidth?: number;
}[] = [
  { field: 'series', headerName: 'Series', flex: 1, minWidth: 120 },
  { field: 'model', headerName: 'Model', flex: 1, minWidth: 120 },
  { field: 'quantity', headerName: 'Quantity', flex: 1, minWidth: 100, type: 'rightAligned' },
];

export function buildChartOptions() {
  return {
    tooltip: {
      trigger: 'axis' as const,
      axisPointer: {
        type: 'cross' as const,
        label: { show: false },
      },
      backgroundColor: 'var(--theme-color-1)',
      borderColor: 'var(--theme-color-soft-bdr)',
      textStyle: {
        color: 'var(--theme-color-std-text)',
      },
      formatter: (params: unknown) => {
        const p = Array.isArray(params) ? params[0] : params;
        const marker = p.marker ?? '';
        const xVal = p.value[0];
        const yVal = p.value[1];
        return `${marker} <b>${p.seriesName}</b><br/>Operating hours: ${xVal}<br/>Vibration: ${yVal} mm/s`;
      },
    },
    legend: {
      show: true,
      bottom: '0',
      left: 'center',
    },
    grid: { left: 60, right: 30, top: 30, bottom: 90 },
    xAxis: CHART_X_AXIS,
    yAxis: CHART_Y_AXIS,
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
  };
}
