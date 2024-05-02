import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeRecruitmentService {
  private apiUrl ="http://localhost:3000/recruitments";

  constructor(private http: HttpClient) { }

   // Method to save employee training record
   saveEmployeeRecruitment(recruitmentData: any) {
    return this.http.post<any>(this.apiUrl, recruitmentData);
  }
  // Get all the trainings of an employee by his id
  getEmployeeRecruitments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
