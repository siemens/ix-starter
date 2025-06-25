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

  it('should have description options matching unique descriptions in rowData', () => {
    const uniqueDescriptions = [...new Set(component.rowData.map((item: any) => item.description))];
    expect(component.categories.description.options).toEqual(uniqueDescriptions);
  });

  it('should have status options matching unique statuses in rowData', () => {
    const uniqueStatuses = [...new Set(component.rowData.map((item: any) => item.status))];
    expect(component.categories.status.options).toEqual(uniqueStatuses);
  });

  it('should have ipAddress options matching unique IP addresses in rowData', () => {
    const uniqueIpAddresses = [...new Set(component.rowData.map((item: any) => item.ipAddress))];
    expect(component.categories.ipAddress.options).toEqual(uniqueIpAddresses);
  });

  it('should have correct labels for each category', () => {
    expect(component.categories.deviceName.label).toBe('Device Name');
    expect(component.categories.vendor.label).toBe('Vendor');
    expect(component.categories.description.label).toBe('Device Type');
    expect(component.categories.status.label).toBe('Status');
    expect(component.categories.ipAddress.label).toBe('IP Address');
  });
});
