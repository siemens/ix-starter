import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { DeviceRangeComponent } from './device-range.component';

describe('DeviceRangeComponent', () => {
  let component: DeviceRangeComponent;
  let fixture: ComponentFixture<DeviceRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceRangeComponent, TranslateModule.forRoot()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeviceRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
