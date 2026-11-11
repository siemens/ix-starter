import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IxContentHeader, IxTypography, IxLinkButton } from '@siemens/ix-angular/standalone';

@Component({
  selector: 'app-get-started',
  imports: [IxContentHeader, IxTypography, IxLinkButton],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.css',
})
export class GetStartedComponent {
  private readonly router = inject(Router);

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
