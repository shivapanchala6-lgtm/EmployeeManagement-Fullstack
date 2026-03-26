import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../Models/employee.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  employees: Employee[] = [];
  newEmployee: Employee = { name: '', email: '', department: '' };

  constructor(private service: EmployeeService) {
    this.loadEmployees();
  }

  loadEmployees() {
    this.service.getEmployees().subscribe({
      next: (res) => this.employees = res,
      error: (err) => console.error(err)
    });
  }

  addEmployee() {
    this.service.addEmployee(this.newEmployee).subscribe(() => {
      this.loadEmployees();
      this.newEmployee = { name: '', email: '', department: '' };
    });
  }

  deleteEmployee(id: number) {
    this.service.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }
}