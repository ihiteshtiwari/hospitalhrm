import { Component } from '@angular/core';
import { EmployeeRecruitmentService } from '../../employee-recruitment.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recruitmentform',
  templateUrl: './recruitmentform.component.html',
  styleUrls: ['./recruitmentform.component.css']
})
export class RecruitmentformComponent {
  formData: any = {};

  constructor(
    private recruitmentService: EmployeeRecruitmentService,
    private router: Router
  ) {}

  submitForm() {
    this.recruitmentService.saveEmployeeRecruitment(this.formData)
      .subscribe(
        (res) => {
          console.log("Successfully submitted the form", res);
          Swal.fire({
            title: 'Success',
            text: 'Form submitted successfully',
            icon: 'success',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['recruitment']); // Navigate to recruitment component
            }
          });
          this.formData = {};
        },
        err => {
          console.log("Error while submitting the form", err);
          Swal.fire({
            title: 'Error',
            text: 'Error while submitting the form',
            icon: 'error',
          });
        }
      );
  }
}
