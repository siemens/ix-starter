import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import * as ag from 'ag-grid-community';
import { getIxTheme } from '@siemens/ix-aggrid';
import { IxContentHeader, IxTypography, IxButton } from '@siemens/ix-angular/standalone';
import { themeSwitcher } from '@siemens/ix';
import { registerTheme } from '@siemens/ix-echarts';
import * as echarts from 'echarts/core';
import { buildChartOptions, CHART_SCATTER_DATA } from './../../shared';

registerTheme(echarts);

const ixTheme = getIxTheme(ag);

function getEChartsThemeName(): string {
  const theme = themeSwitcher.getTheme();
  const colorSchema = themeSwitcher.getColorSchema();
  let mode = colorSchema;
  if (colorSchema === 'system') {
    mode = globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return `theme-${theme}-${mode}`;
}

const CHART_TABLE_DATA = CHART_SCATTER_DATA.map(([hours, vibration]) => ({
  operatingHours: hours,
  vibration: vibration,
}));

const CHART_TABLE_COL_DEFS: ag.ColDef[] = [
  { field: 'operatingHours', headerName: 'Operating Hours (Pump A-102)', flex: 1, minWidth: 150 },
  { field: 'vibration', headerName: 'Vibration (mm/s)', flex: 1, minWidth: 150 },
];

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [IxContentHeader, IxTypography, IxButton, AgGridAngular],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css',
})
export class ChartsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartContainer') chartContainer!: ElementRef<HTMLDivElement>;
  private chartInstance: echarts.ECharts | null = null;
  private resizeObserver: ResizeObserver | null = null;

  showTable = false;
  chartTableData = CHART_TABLE_DATA;
  chartTableColDefs = CHART_TABLE_COL_DEFS;
  ixTheme = ixTheme;

  constructor(private ngZone: NgZone) {}

  toggleView() {
    this.showTable = !this.showTable;
    if (!this.showTable) {
      setTimeout(() => {
        if (this.chartContainer?.nativeElement) {
          const existingInstance = echarts.getInstanceByDom(this.chartContainer.nativeElement);
          if (existingInstance) {
            existingInstance.dispose();
          }
          this.chartInstance = echarts.init(
            this.chartContainer.nativeElement,
            getEChartsThemeName(),
          );
          this.chartInstance.setOption(buildChartOptions());
        }
      }, 0);
    }
  }

  private themeChangeHandler = () => {
    this.chartInstance?.dispose();
    if (!this.chartContainer?.nativeElement) return;
    this.chartInstance = echarts.init(this.chartContainer.nativeElement, getEChartsThemeName());
    this.chartInstance.setOption(buildChartOptions());
  };

  ngAfterViewInit() {
    const container = this.chartContainer.nativeElement;

    this.resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      if (width === 0 || height === 0) return;

      this.ngZone.run(() => {
        if (this.chartInstance) {
          this.chartInstance.resize();
        } else {
          this.chartInstance = echarts.init(container, getEChartsThemeName());
          this.chartInstance.setOption(buildChartOptions());
          themeSwitcher.themeChanged.on(this.themeChangeHandler);
        }
      });
    });

    this.resizeObserver.observe(container);
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
    themeSwitcher.themeChanged.off(this.themeChangeHandler);
    this.chartInstance?.dispose();
  }
}
