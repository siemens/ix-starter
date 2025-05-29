import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastService, ToastType } from '@siemens/ix-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  canPasteSubject = new BehaviorSubject<boolean>(false);
  currentLang = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLang.asObservable();

  constructor(
    private readonly toastService: ToastService,
    private readonly translate: TranslateService
  ) {
    const savedLang = localStorage.getItem('selectedLang') || 'en';
    this.setLanguage(savedLang);
  }

  showToast(message: string, type: ToastType) {
    this.toastService.show({
      message,
      type,
    });
  }
  setLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang.next(lang);
    localStorage.setItem('selectedLang', lang);
  }
}
