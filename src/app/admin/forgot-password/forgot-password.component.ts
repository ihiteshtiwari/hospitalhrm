import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.forgotPassword(this.email)
      .subscribe(
        response => {
          // Handle successful password reset request
          console.log('Password reset email sent successfully:', response);
          this.message = 'Password reset email sent successfully';
          // Show alert message for 3 seconds
          setTimeout(() => {
            this.message = '';
            // Redirect to the reset password page
            this.router.navigate(['/reset-password']);
          }, 3000);
        },
        error => {
          // Handle error in password reset request
          console.error('Forgot password error:', error);
          this.error = error.error.message || 'An error occurred during password reset request.';
        }
      );
  }
}
