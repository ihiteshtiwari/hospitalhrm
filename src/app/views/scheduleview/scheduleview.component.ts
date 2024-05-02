import { Component, OnInit } from '@angular/core';
import { EmployeeRecruitmentService } from '../../employee-recruitment.service';

@Component({
  selector: 'app-scheduleview',
  templateUrl: './scheduleview.component.html',
  styleUrls: ['./scheduleview.component.css']
})
export class ScheduleviewComponent implements OnInit {
  employeeRecruitments: any[] = [];
  statusCounts: { [key: string]: number } = {}; // Object to store status counts

  constructor(private recruitmentService: EmployeeRecruitmentService) { }

  ngOnInit(): void {
    this.fetchEmployeeRecruitments();
  }

  fetchEmployeeRecruitments() {
    this.recruitmentService.getEmployeeRecruitments()
      .subscribe(
        (data: any[]) => {
          this.employeeRecruitments = data;
          this.calculateStatusCounts();
        },
        (error: any) => {
          console.error('Error fetching employee recruitment records:', error);
        }
      );
  }

  calculateStatusCounts(): void {
    this.statusCounts = this.employeeRecruitments.reduce((acc, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, {});
  }

  getTotalRecruitmentCount(): number {
    return this.employeeRecruitments.length;
  }

  getOpenRecruitmentCount(): number {
    return this.statusCounts['Open'] || 0;
  }

  getCloseRecruitmentCount(): number {
    return this.statusCounts['Close'] || 0;
  }
}
