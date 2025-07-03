import { Component, inject, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import {
  IxModalHeader,
  IxModalContent,
  IxModalFooter,
  IxButton,
  IxActiveModal,
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
    IxTextValueAccessorDirective,
    ReactiveFormsModule,
    TranslateModule,
    IxSelect,
    IxSelectItem,
    IxSelectValueAccessorDirective,
    TranslateModule,
  ],
  templateUrl: './add-device-model.component.html',
  styleUrl: './add-device-model.component.scss',
})
export class AddDeviceModelComponent implements OnInit {
  addDeviceForm!: FormGroup;
  @Inject(IxActiveModal) readonly activeModal = inject(IxActiveModal);

  ngOnInit() {
    this.addDeviceForm = new FormGroup({
      deviceName: new FormControl('', [Validators.required]),
      vendor: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      status: new FormControl('', [Validators.required]),
      ipAddress: new FormControl('', [Validators.required]),
      articleNumber: new FormControl('', [Validators.required]),
      macAddress: new FormControl('', [Validators.required]),
      firmwareVersion: new FormControl(''),
      serialNumber: new FormControl(''),
    });
  }

  submitForm() {
    this.activeModal.close(this.addDeviceForm.value);
  }
}
