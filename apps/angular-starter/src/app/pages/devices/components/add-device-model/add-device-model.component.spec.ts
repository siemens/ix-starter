import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceModelComponent } from './add-device-model.component';

describe('AddDeviceModelComponent', () => {
  let component: AddDeviceModelComponent;
  let fixture: ComponentFixture<AddDeviceModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDeviceModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDeviceModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
