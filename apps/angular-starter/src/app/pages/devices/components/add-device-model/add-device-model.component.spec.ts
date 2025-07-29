import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AddDeviceModelComponent } from './add-device-model.component';
import { IxActiveModal } from '@siemens/ix-angular/standalone';

const mockIxActiveModal = {
  close: jasmine.createSpy('close'),
  dismiss: jasmine.createSpy('dismiss')
  // Add any other methods your component uses
};

describe('AddDeviceModelComponent', () => {
  let component: AddDeviceModelComponent;
  let fixture: ComponentFixture<AddDeviceModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDeviceModelComponent, TranslateModule.forRoot()],
      providers: [
        { provide: IxActiveModal, useValue: mockIxActiveModal }
      ]
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
