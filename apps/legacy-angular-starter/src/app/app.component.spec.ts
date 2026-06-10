
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import { fakeAsync, tick, TestBed } from '@angular/core/testing';
import { NavigationEnd, provideRouter, Router } from '@angular/router';
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
    let fixture: any;
    let component: AppComponent;
    let router: Router;


    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
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
      const spy = spyOn(AppComponent.prototype as any, 'setActivePageFromUrl');
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      component.ngOnInit();
      expect(spy).toHaveBeenCalledWith('/');
    });

    it('should update activePage on NavigationEnd event', fakeAsync(() => {
      component.ngOnInit();
      (router.events as Subject<any>).next(new NavigationEnd(1, '/devices', '/devices'));
      tick();
      expect(component.activePage).toBe('devices');
    }));
  });
});
