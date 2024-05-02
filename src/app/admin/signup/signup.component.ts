import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    this.authService.signup(user)
      .subscribe(
        response => {
          // Handle successful signup, e.g., show success message, navigate to login
          console.log('Signup successful:', response);
          this.router.navigate(['/login']);
        },
        error => {
          // Handle signup error
          console.error('Signup error:', error);
          this.error = error.error.message || 'An error occurred during signup.';
        }
      );
  }
}
