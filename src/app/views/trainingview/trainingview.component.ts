import { Component, OnInit } from '@angular/core';
import { EmployeeTrainingService } from '../../employee-training.service';

@Component({
  selector: 'app-trainingview',
  templateUrl: './trainingview.component.html',
  styleUrls: ['./trainingview.component.css'] // It should be styleUrls, not styleUrl
})
export class TrainingviewComponent implements OnInit {
  employeeTrainings: any[] = [];
  totalTrainings: number = 0;

  constructor(private trainingService: EmployeeTrainingService) { }

  ngOnInit(): void {
    this.fetchEmployeeTrainings();
  }

  fetchEmployeeTrainings() {
    this.trainingService.getEmployeeTrainings()
      .subscribe(
        (data: any[]) => {
          this.employeeTrainings = data;
          this.calculateTotalTrainings();
        },
        (error: any) => {
          console.error('Error fetching employee training records:', error);
        }
      );
  }

  calculateTotalTrainings(): void {
    this.totalTrainings = this.employeeTrainings.length;
  }
}
