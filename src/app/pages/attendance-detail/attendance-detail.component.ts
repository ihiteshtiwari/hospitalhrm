import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AttendanceService } from '../../attendance.service';

@Component({
  selector: 'app-attendance-detail',
  templateUrl: './attendance-detail.component.html',
})
export class AttendanceDetailComponent implements OnInit {
  staffId: string;
  staffName: string;
  months: { name: string, attendance: string }[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AttendanceDetailComponent>, // Inject MatDialogRef directly
    private attendanceService: AttendanceService
  ) {
    this.staffId = data.itemId;
  }

  ngOnInit(): void {
    this.loadAttendanceDetail();
  }

  loadAttendanceDetail(): void {
    // Fetch staff name
    // You need to implement a method in your AttendanceService to fetch staff name by ID
    // For example:
    // this.attendanceService.getStaffName(this.staffId).subscribe(name => this.staffName = name);

    // Fetch attendance data for each month
    // You need to implement a method in your AttendanceService to fetch attendance data by staff ID
    // For example:
    // this.attendanceService.getAttendanceByStaffId(this.staffId).subscribe(data => this.months = data);

    // Example data (replace with actual implementation)
    this.staffName = "John Doe";

    // Dummy data for demonstration
    this.months = [
      { name: "January", attendance: "Present" },
      { name: "February", attendance: "Absent" },
      { name: "March", attendance: "Present" },
      // Add data for other months here...
    ];
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
