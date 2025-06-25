
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import { fakeAsync, tick, TestBed } from '@angular/core/testing';
import { Router, NavigationEnd, provideRouter } from '@angular/router';
import { Subject } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  describe('AppComponent additional logic', () => {
    let routerMock: any;
    let component: AppComponent;

    beforeEach(() => {
      routerMock = {
        url: '/overview',
        events: new Subject(),
      };
      component = new AppComponent(routerMock as Router);
    });

    it('should set activePage to "overview" if url contains "overview"', () => {
      component['setActivePageFromUrl']('/overview');
      expect(component.activePage).toBe('overview');
    });

    it('should set activePage to "devices" if url contains "devices"', () => {
      component['setActivePageFromUrl']('/devices');
      expect(component.activePage).toBe('devices');
    });

    it('should call setActivePageFromUrl on ngOnInit with initial url', () => {
      const spy = spyOn<any>(component, 'setActivePageFromUrl');
      component.ngOnInit();
      expect(spy).toHaveBeenCalledWith('/overview');
    });

    it('should update activePage on NavigationEnd event', fakeAsync(() => {
      component.ngOnInit();
      routerMock.events.next(new NavigationEnd(1, '/devices', '/devices'));
      tick();
      expect(component.activePage).toBe('devices');
    }));
  });
});
