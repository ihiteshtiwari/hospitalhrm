// employee-id.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeIdService {
  private currentId: number = 1000; // Initialize with the starting ID

  constructor() { }

  generateEmployeeId(): string {
    this.currentId++; // Increment the current ID
    return 'EMP' + this.currentId.toString(); // Return the generated ID
  }
}
