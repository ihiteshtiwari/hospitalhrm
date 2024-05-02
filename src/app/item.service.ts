import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/items'; // Update to your server URL
  private timeOffApiUrl = 'http://localhost:3000/time-off'; // Time-off requests API URL

  constructor(private http: HttpClient) {}

  // Existing methods for managing items
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getItem(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addItem(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, item);
  }

  updateItem(id: string, item: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // New methods for managing time-off requests
  getTimeOffRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.timeOffApiUrl}/requests`);
  }

  approveTimeOffRequest(requestId: string): Observable<any> {
    return this.http.put<any>(`${this.timeOffApiUrl}/requests/${requestId}/approve`, {});
  }

  rejectTimeOffRequest(requestId: string): Observable<any> {
    return this.http.put<any>(`${this.timeOffApiUrl}/requests/${requestId}/reject`, {});
  }

  // New method to update item status to 'Approved'
  approveItem(itemId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${itemId}/approve`, {});
  }

  // New method to update item status to 'Rejected'
  rejectItem(itemId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${itemId}/reject`, {});
  }
}