import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  SI_DATATABLE_CONFIG,
  SiDatatableInteractionDirective,
} from '@siemens/element-ng/datatable';
import { NgxDatatableModule } from '@siemens/ngx-datatable';

@Component({
  selector: 'app-grids',
  imports: [NgxDatatableModule, SiDatatableInteractionDirective, TranslatePipe],
  templateUrl: './grids.html',
})
export class Grids {
  protected readonly tableConfig = SI_DATATABLE_CONFIG;
  protected readonly rows = signal<
    { id: number; name: string; department: string; role: string }[]
  >([]);

  constructor() {
    this.rows.set([
      { id: 1, name: 'John Doe', department: 'Engineering', role: 'Software Engineer' },
      { id: 2, name: 'Jane Smith', department: 'Marketing', role: 'Marketing Manager' },
      { id: 3, name: 'Michael Johnson', department: 'Sales', role: 'Sales Representative' },
      { id: 4, name: 'Emily Davis', department: 'Human Resources', role: 'HR Specialist' },
      { id: 5, name: 'David Wilson', department: 'Finance', role: 'Financial Analyst' },
      { id: 6, name: 'Sarah Thompson', department: 'Customer Support', role: 'Support Specialist' },
      { id: 7, name: 'Daniel Martinez', department: 'Operations', role: 'Operations Manager' },
      { id: 8, name: 'Olivia Anderson', department: 'Design', role: 'UI/UX Designer' },
      { id: 9, name: 'James Taylor', department: 'IT', role: 'System Administrator' },
    ]);
  }
}
