import { Component } from '@angular/core';
import { EmployeeComponent } from './components/employee/employee.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EmployeeComponent],
  template: `<app-employee></app-employee>`
})
export class AppComponent {}