import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCellRendererComponent } from './device-cell-renderer.component';

describe('DeviceCellRendererComponent', () => {
  let component: DeviceCellRendererComponent;
  let fixture: ComponentFixture<DeviceCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceCellRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
