import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../attendance.service';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {
  attendanceList: any[];

  constructor(private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    this.fetchAttendanceList();
  }

  fetchAttendanceList(): void {
    this.attendanceService.getAttendanceList().subscribe(
      (data) => {
        this.attendanceList = data;
      },
      (error) => {
        console.error('Error fetching attendance list:', error);
      }
    );
  }
}
