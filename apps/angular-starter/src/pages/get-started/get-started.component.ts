import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IxContentHeader, IxTypography, IxLinkButton } from '@siemens/ix-angular/standalone';

@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [IxContentHeader, IxTypography, IxLinkButton],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.css',
})
export class GetStartedComponent {
  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
