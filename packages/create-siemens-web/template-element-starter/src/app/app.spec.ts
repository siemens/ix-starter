import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideMissingTranslationHandlerForElement } from '@siemens/element-translate-ng/ngx-translate';

import { App as TestComponent } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        provideRouter([]),
        provideTranslateService({
          missingTranslationHandler: provideMissingTranslationHandlerForElement(),
        }),
      ],
    }).compileComponents();
  });

  it('should create component', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
