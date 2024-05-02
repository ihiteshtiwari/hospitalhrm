import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../attendance.service';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.css']
})
export class AddAttendanceComponent implements OnInit {
  employeeId: string;
  date: string;
  status: string;

  constructor(private attendanceService: AttendanceService) { }

  ngOnInit(): void {
  }

  submitForm(): void {
    if (!this.employeeId || !this.date || !this.status) {
      alert('Please fill in all fields.');
      return;
    }

    const attendanceData = {
      employeeId: this.employeeId,
      date: this.date,
      status: this.status
    };

    this.attendanceService.addAttendance(attendanceData)
      .subscribe(
        response => {
          console.log('Attendance added successfully:', response);
          // Optionally, you can navigate to another page or reset the form
        },
        error => {
          console.error('Error adding attendance:', error);
          // Handle error
        }
      );
  }
}
