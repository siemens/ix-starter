import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import {
  DateRange,
  SiCalendarButtonComponent,
  SiDatepickerDirective,
  SiDateRangeComponent,
  SiTimepickerComponent,
} from '@siemens/element-ng/datepicker';
import { SiFormFieldsetComponent, SiFormItemComponent } from '@siemens/element-ng/form';
import { SiHelpButtonComponent } from '@siemens/element-ng/help-button';
import { SiNumberInputComponent } from '@siemens/element-ng/number-input';
import { PhoneDetails, SiPhoneNumberInputComponent } from '@siemens/element-ng/phone-number';
import { SelectOption, SiSelectModule } from '@siemens/element-ng/select';

export type Role = 'ENGINEER' | 'INSTALLER';

export const is18Years: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value || isNaN(control.value.getTime())) {
    return null;
  }
  const date: Date = control.value;
  const now = new Date();
  const eighteen = 18 * 31556952000;
  const diff = now.getTime() - date.getTime();
  return diff >= eighteen ? null : { notEighteen: control.value };
};

@Component({
  selector: 'app-forms',
  imports: [
    ReactiveFormsModule,
    SiCalendarButtonComponent,
    SiDatepickerDirective,
    SiDateRangeComponent,
    SiFormFieldsetComponent,
    SiFormItemComponent,
    SiHelpButtonComponent,
    SiNumberInputComponent,
    SiPhoneNumberInputComponent,
    SiSelectModule,
    SiTimepickerComponent,
    TranslatePipe,
  ],
  templateUrl: './forms.html',
})
export class Forms {
  protected readonly optionsList: SelectOption<string>[] = [
    {
      type: 'option',
      value: 'first',
      icon: 'element-face-happy',
      iconColor: 'status-success',
      label: 'First class',
    },
    {
      type: 'option',
      value: 'business',
      icon: 'element-face-neutral',
      iconColor: 'status-warning',
      label: 'Business',
    },
    {
      type: 'option',
      value: 'economy',
      icon: 'element-face-unhappy',
      iconColor: 'status-danger',
      label: 'Economy',
    },
  ];

  protected readonly form = new FormGroup({
    name: new FormControl(''),
    role: new FormControl<Role | null>(null, [Validators.required]),
    description: new FormControl(''),
    phoneNumber: new FormControl<PhoneDetails | null>(null),
    birthday: new FormControl<Date | string>('', is18Years),
    travelDate: new FormControl<DateRange | null>(null),
    arrival: new FormControl<Date | null>(null),
    departure: new FormControl<Date | null>(null),
    serviceClass: new FormControl('first'),
    fellowPassengers: new FormControl(0, Validators.min(2)),
  });
}
