import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IxCard,
  IxCardContent,
  IxTypography,
} from '@siemens/ix-angular/standalone';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { getComputedCSSProperty } from '@siemens/ix-echarts';
import * as echarts from 'echarts/core';
import { EChartsOption } from 'echarts';
import { LineChart } from 'echarts/charts';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { themeSwitcher } from '@siemens/ix';
import { AsyncPipe } from '@angular/common';

echarts.use([LineChart]);

@Component({
  selector: 'status-history',
  imports: [
    IxCard,
    IxCardContent,
    IxTypography,
    NgxEchartsDirective,
    TranslateModule,
    AsyncPipe,
  ],
  templateUrl: './status-history.component.html',
  styleUrl: './status-history.component.scss',
  providers: [provideEchartsCore({ echarts })],
})
export class StatusHistoryComponent implements OnInit {
  @ViewChild(NgxEchartsDirective) chart!: NgxEchartsDirective;

  themeSubject = new BehaviorSubject<string>('theme-classic-dark');
  theme$ = this.themeSubject.asObservable();

  seriesOnline = {
    name: 'Online',
    color: getComputedCSSProperty('color-success'),
    data: [60, 75, 100, 60, 75, 60],
  };

  seriesOffline = {
    name: 'Offline',
    color: getComputedCSSProperty('color-neutral'),
    data: [-30, -62, -25, -61, -99, -60],
  };

  seriesErrors = {
    name: 'Errors',
    color: getComputedCSSProperty('color-alarm'),
    data: [0, 17, -39, -60, -20, -2],
  };

  seriesMaintenance = {
    name: 'Maintenance',
    color: getComputedCSSProperty('color-warning'),
    data: [0, 2, -90, -85, -3, -1],
  };

  options: EChartsOption = {
    legend: {
      show: true,
      bottom: '0',
      left: '0',
      icon: 'rect',
    },

    grid: {
      top: 10,
      bottom: 85,
      left: 40,
      right: 10,
    },

    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      boundaryGap: false,
      splitLine: {
        show: true,
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
      },
    },
    series: [
      {
        type: 'line',
        ...this.seriesOnline,
      },
      {
        type: 'line',
        ...this.seriesMaintenance,
      },
      {
        type: 'line',
        ...this.seriesErrors,
      },
      {
        type: 'line',
        ...this.seriesOffline,
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {
    themeSwitcher.themeChanged.on((theme: string) => {
      this.themeSubject.next(theme);
    });
  }
}
