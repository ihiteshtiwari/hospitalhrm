import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  otp: string = '';
  newPassword: string = '';
  message: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
  ) { }

  onSubmit() {
    if (!this.otp) {
      console.error('Reset password OTP not found');
      this.error = 'Invalid reset password OTP';
      return;
    }

    this.authService.resetPassword(this.otp, this.newPassword)
      .subscribe(
        response => {
          // Handle successful password reset
          console.log('Password reset successfully:', response);
          this.message = 'Password reset successfully. You can now login with your new password.';
        },
        error => {
          // Handle error in password reset
          console.error('Reset password error:', error);
          this.error = error.error.message || 'An error occurred during password reset.';
        }
      );
  }
}
