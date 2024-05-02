import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(
      user => {
        this.currentUser = user;
      },
      error => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        // Navigate to login page or handle logout logic
      },
      error => {
        console.error('Logout error:', error);
      }
    );
  }
}
