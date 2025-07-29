import { Component, inject, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import {
  IxModalHeader,
  IxModalContent,
  IxModalFooter,
  IxButton,
  IxActiveModal,
  IxInput,
  IxTextValueAccessorDirective,
  IxSelect,
  IxSelectItem,
  IxSelectValueAccessorDirective,
} from '@siemens/ix-angular/standalone';

@Component({
  selector: 'app-add-device-model',
  standalone: true,
  imports: [
    IxModalHeader,
    IxModalContent,
    IxModalFooter,
    IxButton,
    IxInput,
    IxTextValueAccessorDirective,
    ReactiveFormsModule,
    TranslateModule,
    IxSelect,
    IxSelectItem,
    IxSelectValueAccessorDirective,
  ],
  templateUrl: './add-device-model.component.html',
  styleUrl: './add-device-model.component.scss',
})
export class AddDeviceModelComponent implements OnInit {
  addDeviceForm!: FormGroup;
  @Inject(IxActiveModal) readonly activeModal = inject(IxActiveModal);

  ngOnInit() {
    this.addDeviceForm = new FormGroup({
      deviceName: new FormControl(''),
      vendor: new FormControl(''),
      description: new FormControl(''),
      status: new FormControl('Online'),  // Default to Online like React
      ipAddress: new FormControl(''),
      articleNumber: new FormControl(''),
      macAddress: new FormControl(''),
      firmwareVersion: new FormControl(''),
      serialNumber: new FormControl(''),
    });
  }

  submitForm() {
    this.activeModal.close(this.addDeviceForm.value);
  }
}
