import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeTrainingService } from '../../employee-training.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'; // Add the import statement for Router

@Component({
  selector: 'app-trainig-form',
  templateUrl: './trainig-form.component.html',
  styleUrls: ['./trainig-form.component.css']
})
export class TrainigFormComponent {
  formData: any = {}; 

  constructor(
    private trainingService: EmployeeTrainingService,
    private router: Router // Inject Router
  ) { }

  submitForm() {
    this.trainingService.saveEmployeeTraining(this.formData)
      .subscribe(
        (response) => {
          console.log('Data sent successfully:', response);
          Swal.fire({
            title: 'Success',
            text: 'Form submitted successfully',
            icon: 'success',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['training']); // Navigate to training component
            }
          });
          
          // Clear the form after successful submission
          this.formData = {};
        },
        (error) => {
          console.error('Error sending data:', error);
          Swal.fire({
            title: 'Error',
            text: 'Error while submitting the form',
            icon: 'error',
          });
        }
      );
  }
}
