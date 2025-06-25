import { Component } from '@angular/core';
import {
  IxRadio,
  IxRadioGroup,
  IxTypography,
} from '@siemens/ix-angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { useShowDemoMessage } from '../../../shared/utlis';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-settings',
  imports: [IxTypography, IxRadio, IxRadioGroup, TranslateModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  selectedThemeVariant = 'theme-classic';
  currentLang: string = 'en';
  isDevMode: boolean = true;
  constructor(private readonly sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.currentLang$.subscribe((lang) => {
      this.currentLang = lang;
    });
  }

  switchLanguage(lang: string) {
    this.sharedService.setLanguage(lang);
  }

  onThemeChange() {
    useShowDemoMessage();
  }
}
