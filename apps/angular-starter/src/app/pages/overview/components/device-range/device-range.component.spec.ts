import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceRangeComponent } from './device-range.component';

describe('DeviceRangeComponent', () => {
  let component: DeviceRangeComponent;
  let fixture: ComponentFixture<DeviceRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceRangeComponent]
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
