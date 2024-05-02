import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../item.service';
import { EmployeeIdService } from '../employee-id.service'; // Import the EmployeeIdService
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
})
export class ItemFormComponent implements OnInit {
  item: any = {};
  errorMessage: string = '';

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private employeeIdService: EmployeeIdService // Inject the EmployeeIdService
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.params['id'];
    if (itemId) {
      this.itemService.getItem(itemId).subscribe(
        (item) => {
          this.item = item;
        },
        (error) => {
          console.error('Error loading item for editing:', error);
        }
      );
    }
  }

  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.item.image = file;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.item.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  button(){
    Swal.fire({
      title: "success",
      text: "That thing is still around?",
      icon: "success"
    });
  }

  saveItem(): void {
    const formData = new FormData();
    formData.append('employeeId', this.employeeIdService.generateEmployeeId()); // Generate employee ID
    formData.append('image', this.item.image);
    formData.append('name', this.item.name);
    formData.append('position', this.item.position);
    formData.append('department', this.item.department);
    formData.append('shift', this.item.shift);
    formData.append('email', this.item.email);
    formData.append('phone', this.item.phone);
    formData.append('date',this.item.date);
    formData.append('leaveStartDate', this.item.leaveStartDate);
    formData.append('leaveEndDate', this.item.leaveEndDate);
    const startDate = new Date(this.item.leaveStartDate);
    const endDate = new Date(this.item.leaveEndDate);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    
    formData.append('numberOfDays', numberOfDays.toString());
    formData.append('leaveType',this.item.leaveType);
    const salary: number = parseFloat(this.item.salary); // Convert to number if not already
    const bonus: number = parseFloat(this.item.bonus); // Convert to number if not already

    // Calculate total compensation
    const totalCompensation: number = salary + bonus;

    // Append to formData
    formData.append('salary', salary.toString());
    formData.append('bonus', bonus.toString());
    formData.append('totalcompensation', totalCompensation.toString());
    

    if (this.item._id) {
      // Update existing item
      this.itemService.updateItem(this.item._id, formData).subscribe(
        (updatedItem) => {
          console.log('employee updated successfully:', updatedItem);
          Swal.fire({
            title: 'Success',
            text: 'employee updated successfully',
            icon: 'success',
          });
          // Handle any additional logic after successful update
          this.router.navigate(['/staff']); // Redirect to item list or any other route
        },
        (error) => {
          console.error('Error updating item:', error);
        }
      );
    } else {
      // Add new item
      this.itemService.addItem(formData).subscribe(
        (newItem) => {
          console.log('employee added successfully:', newItem);
          // Handle any additional logic after successful addition
          Swal.fire({
            title: 'Success',
            text: 'employee added successfully',
            icon: 'success',
          });
          this.router.navigate(['/staff']); // Redirect to item list or any other route
        },
        (error) => {
          console.error('Error adding item:', error);
        }
      );
    }
  }
}
