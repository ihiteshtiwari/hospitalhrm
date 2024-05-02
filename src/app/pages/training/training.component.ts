import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeTrainingService } from '../../employee-training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  employeeTrainings: any[] = [];

  constructor(private trainingService: EmployeeTrainingService) { }

  ngOnInit(): void {
    this.fetchEmployeeTrainings();
  }

  fetchEmployeeTrainings() {
    this.trainingService.getEmployeeTrainings()
      .subscribe(
        (data: any[]) => {
          this.employeeTrainings = data;
        },
        (error: any) => {
          console.error('Error fetching employee training records:', error);
        }
      );
  }
}