import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IxContentHeader,
  IxTypography,
  IxInput,
  IxSelect,
  IxSelectItem,
  IxDateInput,
  IxRadioGroup,
  IxRadio,
  IxButton,
  MessageService,
} from '@siemens/ix-angular/standalone';
import { iconQuestion } from '@siemens/ix-icons/icons';

const INSPECTION_TYPES = [
  'Visual Inspection',
  'Dimensional Check',
  'Functional Test',
  'Safety Audit',
];

@Component({
  selector: 'app-forms-page',
  standalone: true,
  imports: [
    FormsModule,
    IxContentHeader,
    IxTypography,
    IxInput,
    IxSelect,
    IxSelectItem,
    IxDateInput,
    IxRadioGroup,
    IxRadio,
    IxButton,
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent {
  INSPECTION_TYPES = INSPECTION_TYPES;
  inspectorName = '';
  inspectionType = '';
  inspectionDate = '';
  inspectionMode = 'inline';

  constructor(private readonly messageService: MessageService) {}

  onInspectionTypeChange(event: CustomEvent<string | string[]>) {
    const value = event.detail;
    this.inspectionType = Array.isArray(value) ? value[0] || '' : value;
  }

  onInspectionDateChange(event: CustomEvent<string | undefined>) {
    this.inspectionDate = event.detail || '';
  }

  async handleSave() {
    await this.messageService.showMessage({
      messageTitle: 'Confirm inspection assignment?',
      message: 'The inspection will be assigned and a notification will be sent to the inspector.',
      icon: iconQuestion,
      centered: true,
      actions: [
        { id: 'cancel', text: 'Cancel', type: 'cancel' },
        { id: 'ok', text: 'Confirm', type: 'okay' },
      ],
    });
  }
}
