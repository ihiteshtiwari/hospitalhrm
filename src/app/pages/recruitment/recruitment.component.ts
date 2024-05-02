import { Component, OnInit } from '@angular/core';
import { EmployeeRecruitmentService } from '../../employee-recruitment.service';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css'] // Use styleUrls instead of styleUrl
})
export class RecruitmentComponent implements OnInit {
  employeeRecruitments: any[] = [];

  constructor(private recruitmentService: EmployeeRecruitmentService) { }

  ngOnInit(): void {
    this.fetchEmployeeRecruitments();
  }

  fetchEmployeeRecruitments() {
    this.recruitmentService.getEmployeeRecruitments()
      .subscribe(
        (data: any[]) => {
          this.employeeRecruitments = data;
        },
        (error: any) => {
          console.error('Error fetching employee recruitment records:', error); // Log error to console
        }
      );
  }
}
