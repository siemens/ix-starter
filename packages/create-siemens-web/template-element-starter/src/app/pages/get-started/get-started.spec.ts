import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideMissingTranslationHandlerForElement } from '@siemens/element-translate-ng/ngx-translate';
import { page } from 'vitest/browser';

import { GetStarted as TestComponent } from './get-started';

describe('GetStarted', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideTranslateService({
          missingTranslationHandler: provideMissingTranslationHandlerForElement(),
        }),
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a page heading', async () => {
    await expect
      .element(page.getByRole('heading', { level: 2 }))
      .toHaveTextContent('GET-STARTED.HEADING');
  });
});
