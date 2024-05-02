import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTrainingService {

  private apiUrl = 'http://localhost:3000/trainings'; // API endpoint for employee training records
 

  constructor(private http: HttpClient) { }

  // Method to save employee training record
  saveEmployeeTraining(trainingData: any) {
    return this.http.post<any>(this.apiUrl, trainingData);
  }
  // Get all the trainings of an employee by his id
  getEmployeeTrainings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}