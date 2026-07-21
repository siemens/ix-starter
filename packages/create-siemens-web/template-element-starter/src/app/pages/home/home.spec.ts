import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideMissingTranslationHandlerForElement } from '@siemens/element-translate-ng/ngx-translate';

import { Home as TestComponent } from './home';

describe('Home', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let element: HTMLElement;

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
    element = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a page heading', () => {
    expect(element.querySelector('h2')?.textContent).toMatch(/HOME\.HEADING/i);
  });
});
