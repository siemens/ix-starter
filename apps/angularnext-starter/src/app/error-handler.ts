import { ErrorHandler, inject, Injectable, Injector } from '@angular/core';
import { ErrorBoundaryComponent } from './../components/error-boundary/error-boundary.component';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private injector = inject(Injector);
  private boundary: ErrorBoundaryComponent | null = null;

  registerBoundary(boundary: ErrorBoundaryComponent) {
    this.boundary = boundary;
  }

  handleError(error: Error): void {
    console.error('Angular error:', error);
    this.boundary?.error.set(error);
  }
}
