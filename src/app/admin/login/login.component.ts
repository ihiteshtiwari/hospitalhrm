import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe(
        response => {
          console.log('Login successful');
          localStorage.setItem('token', response.token);
          // Show success message using SweetAlert
          Swal.fire({
            title: 'Success',
            text: 'Login successful',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Redirect to user details page upon successful login
            this.router.navigate(['/dashboard']);
          });
        },
        error => {
          console.error('Login error:', error);
          this.error = error.error.message || 'An error occurred during login.';
          // Show error message using SweetAlert
          Swal.fire({
            title: 'Error',
            text: this.error,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
  }
}
