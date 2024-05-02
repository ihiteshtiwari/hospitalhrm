import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://localhost:3000/attendance'; // Update with your actual API URL

  constructor(private http: HttpClient) { }

  // Fetch all attendance records
  getAttendanceList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch attendance record by ID
  getAttendanceById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addAttendance(attendanceData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, attendanceData);
  }

 
taffAttendance(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`).pipe(
      catchError(this.handleError)
    );
  }

  // Handle HTTP errors
  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
