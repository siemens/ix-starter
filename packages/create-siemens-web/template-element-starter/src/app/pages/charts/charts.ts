import {
  afterNextRender,
  Component,
  effect,
  inject,
  Injector,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService, TranslationObject } from '@ngx-translate/core';
import { CartesianChartSeries, SiChartCartesianComponent } from '@siemens/charts-ng/cartesian';
import { SiResizeObserverDirective } from '@siemens/element-ng/resize-observer';

@Component({
  selector: 'app-charts',
  imports: [SiChartCartesianComponent, SiResizeObserverDirective, TranslatePipe],
  templateUrl: './charts.html',
})
export class Charts {
  private readonly injector = inject(Injector);
  private readonly translateService = inject(TranslateService);
  private readonly translated = toSignal<TranslationObject>(
    this.translateService.stream(['CHARTS.CHART.LINES_ADDED', 'CHARTS.CHART.LINES_REMOVED']),
  );
  private readonly chart = viewChild.required(SiChartCartesianComponent);

  readonly series = signal<CartesianChartSeries[]>([]);

  constructor() {
    effect(() => {
      const translated = this.translated();
      if (!translated) {
        return;
      }
      this.series.set([
        {
          type: 'line',
          name: translated['CHARTS.CHART.LINES_ADDED'] as string,
          symbol: 'rect',
          data: [50, 25, 10, 43, 58, 80, 0],
        },
        {
          type: 'line',
          name: translated['CHARTS.CHART.LINES_REMOVED'] as string,
          symbol: 'diamond',
          data: [20, 10, 15, 29, 47, 0, 100],
        },
      ]);
      afterNextRender(() => this.chart().resize(), { injector: this.injector });
    });
  }
}
