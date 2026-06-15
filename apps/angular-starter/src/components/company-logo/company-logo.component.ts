import { Component } from '@angular/core';

@Component({
  selector: 'app-company-logo',
  standalone: true,
  templateUrl: './company-logo.component.html',
})
export class CompanyLogoComponent {
  protected readonly showLogo = !window.customElements.get('ix-siemens-logo');
}
