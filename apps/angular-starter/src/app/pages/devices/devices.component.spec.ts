import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { DevicesComponent } from './devices.component';

describe('DevicesComponent', () => {
  let component: DevicesComponent;
  let fixture: ComponentFixture<DevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevicesComponent, TranslateModule.forRoot()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('categories', () => {
  let component: DevicesComponent;
  let fixture: ComponentFixture<DevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevicesComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have deviceName options matching unique device names in rowData', () => {
    const uniqueDeviceNames = [...new Set(component.rowData.map((item: any) => item.deviceName))];
    expect(component.categories.deviceName.options).toEqual(uniqueDeviceNames);
  });

  it('should have vendor options matching unique vendors in rowData', () => {
    const uniqueVendors = [...new Set(component.rowData.map((item: any) => item.vendor))];
    expect(component.categories.vendor.options).toEqual(uniqueVendors);
  });

  it('should have deviceType options matching unique device types in rowData', () => {
    const uniqueDeviceTypes = [...new Set(component.rowData.map((item: any) => item.deviceType))];
    expect(component.categories.deviceType.options).toEqual(uniqueDeviceTypes);
  });

  it('should have status options matching unique statuses in rowData', () => {
    const uniqueStatuses = [...new Set(component.rowData.map((item: any) => item.status))];
    expect(component.categories.status.options).toEqual(uniqueStatuses);
  });

  it('should have IPAddress options matching unique IP addresses in rowData', () => {
    const uniqueIPAddresses = [...new Set(component.rowData.map((item: any) => item.IPAddress))];
    expect(component.categories.IPAddress.options).toEqual(uniqueIPAddresses);
  });

  it('should have correct labels for each category', () => {
    // In test environment, translation keys are returned instead of translated values
    expect(component.categories.deviceName.label).toBe('device-details.device-name');
    expect(component.categories.vendor.label).toBe('device-details.vendor');
    expect(component.categories.deviceType.label).toBe('device-details.device-type');
    expect(component.categories.status.label).toBe('device-details.status');
    expect(component.categories.IPAddress.label).toBe('device-details.ipaddress');
  });
});
