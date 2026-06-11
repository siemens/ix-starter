import { Component, signal } from '@angular/core';
import { IxTypography, IxButton } from '@siemens/ix-angular/standalone';

@Component({
  selector: 'app-error-boundary',
  standalone: true,
  imports: [IxTypography, IxButton],
  templateUrl: './error-boundary.component.html',
  styleUrl: './error-boundary.component.css',
})
export class ErrorBoundaryComponent {
  error = signal<Error | null>(null);

  reload() {
    globalThis.location.reload();
  }
}
