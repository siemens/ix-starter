import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    class: 'has-navbar-fixed-top si-layout-fixed-height'
  }
})
export class App {
  private settingsService = inject(SettingsService);
  selectedValue = this.settingsService.language;
}
