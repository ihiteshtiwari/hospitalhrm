import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:3000'; // Your backend server URL
  private authToken: string | null = null;

  constructor(private http: HttpClient) { }
  setToken(token: string): void {
    // Store the token securely
    this.authToken = token;
  }

  getToken(): string | null {
    // Retrieve the token
    return this.authToken;
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/login`, credentials);
  }

  signup(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/signup`, user);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/reset-password/${token}`, { newPassword });
  }


  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authToken}`
      })
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError('An error occurred. Please try again later.');
  }
}
