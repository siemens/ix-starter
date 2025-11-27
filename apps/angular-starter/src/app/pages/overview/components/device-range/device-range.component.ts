import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IxCard,
  IxCardContent,
  IxTypography,
} from '@siemens/ix-angular/standalone';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { registerTheme, getComputedCSSProperty } from '@siemens/ix-echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components';
import { BarSeriesOption, EChartsOption } from 'echarts';
import { Device } from '../../../../shared/models/types';
import { themeSwitcher, Disposable } from '@siemens/ix';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DEVICE_INFO } from '../../../../../assets/mock-data/data';

echarts.use([
  BarChart,
  CanvasRenderer,
  GridComponent,
  LegendComponent,
  TooltipComponent,
]);

@Component({
  selector: 'app-device-range',
  standalone: true,
  imports: [
    IxCardContent,
    IxTypography,
    NgxEchartsDirective,
    TranslateModule,
    AsyncPipe,
    IxCard,
  ],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './device-range.component.html',
  styleUrl: './device-range.component.scss',
})
export class DeviceRangeComponent implements OnInit, OnDestroy {
  options: EChartsOption = {};
  devices: Device[] = [];
  ipRanges: string[] = [];
  themeSubject = new BehaviorSubject<string>('theme-classic-dark');
  theme$ = this.themeSubject.asObservable();
  currentTheme = 'theme-classic-dark';

  themeChangedDisposable?: Disposable;

  ngOnInit(): void {
    this.devices = DEVICE_INFO;
    this.options = this.getChartOptions(this.reduceDevices(this.devices));
    registerTheme(echarts);

    const currentTheme = themeSwitcher.getCurrentTheme();
    this.themeSubject.next(currentTheme);

    themeSwitcher.themeChanged.on((theme: string) =>
      this.themeSubject.next(theme),
    );
  }

  ngOnDestroy(): void {
    this.themeChangedDisposable?.dispose();
  }

  reduceDevices(devices: Device[]): BarSeriesOption[] {
    const onlineData = new Map<string, number>();
    const offlineData = new Map<string, number>();
    const maintenanceData = new Map<string, number>();
    const errorData = new Map<string, number>();
    const totalData = new Map<string, number>();

    devices.forEach((device) => {
      this.fillData(device, onlineData, 'Online', totalData);
      this.fillData(device, maintenanceData, 'Maintenance', totalData);
      this.fillData(device, errorData, 'Error', totalData);
      this.fillData(device, offlineData, 'Offline', totalData);
    });

    this.ipRanges = Array.from(
      new Set(devices.map((d) => d.ipAddress.split('.')[0] + '.x')),
    ).sort((a, b) => (totalData.get(b) || 0) - (totalData.get(a) || 0));

    return [
      {
        name: 'Online',
        data: this.createSeries(onlineData, this.ipRanges),
        type: 'bar',
        stack: 'x',
        color: getComputedCSSProperty('color-success'),
      },
      {
        name: 'Maintenance',
        data: this.createSeries(maintenanceData, this.ipRanges),
        type: 'bar',
        stack: 'x',
        color: getComputedCSSProperty('color-warning'),
      },
      {
        name: 'Error',
        data: this.createSeries(errorData, this.ipRanges),
        type: 'bar',
        stack: 'x',
        color: getComputedCSSProperty('color-alarm'),
      },
      {
        name: 'Offline',
        data: this.createSeries(offlineData, this.ipRanges),
        type: 'bar',
        stack: 'x',
        color: getComputedCSSProperty('color-neutral'),
      },
    ];
  }

  private fillData(
    device: Device,
    data: Map<string, number>,
    state: Device['status'],
    totalData: Map<string, number>,
  ): void {
    const ipSegment = device.ipAddress.split('.')[0] + '.x';

    if (device.status !== state) {
      return;
    }

    if (data.has(ipSegment)) {
      data.set(ipSegment, data.get(ipSegment)! + 1);
    } else {
      data.set(ipSegment, 1);
    }
    totalData.set(ipSegment, (totalData.get(ipSegment) || 0) + 1);
  }

  private createSeries(
    data: Map<string, number>,
    ipRanges: string[],
  ): [number, string][] {
    return ipRanges.map((ip) => [data.get(ip) || 0, ip]);
  }

  getChartOptions(series: BarSeriesOption[]): EChartsOption {
    return {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'horizontal',
        icon: 'rect',
        bottom: '0',
        left: '0',
      },
      xAxis: {
        type: 'value',
        name: 'Devices',
        nameLocation: 'middle',
        nameGap: 25,
      },
      yAxis: {
        type: 'category',
        name: 'IP Range',
        data: this.ipRanges,
        nameLocation: 'end',
      },
      grid: {
        top: 45,
        bottom: 85,
      },
      series,
    };
  }
}
