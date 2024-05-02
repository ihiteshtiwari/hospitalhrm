import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser()
      .subscribe(
        user => {
          this.user = user;
        },
        error => {
          console.error('Error fetching user details:', error);
        }
      );
  }
}