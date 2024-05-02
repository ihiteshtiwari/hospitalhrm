import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  item: any = {};
  errorMessage: string = '';
  showForm: boolean = false; // Initially hide the form

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
    
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
    } else {
      this.itemService.getItems().subscribe(
        (items) => {
          this.item = items;
        },
        (error) => {
          console.error('Error loading items:', error);
        }
      );
    }
  }
  

  toggleForm(): void {
    this.showForm = !this.showForm;
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

  saveItem(): void {
    const formData = new FormData();
    formData.append('name', this.item.name);
    formData.append('position', this.item.position);
    formData.append('department', this.item.department);
    formData.append('shift', this.item.shift);
     formData.append('date',this.item.date);

    if (this.item._id) {
      // Update existing item
      this.itemService.updateItem(this.item._id, formData).subscribe(
        (updatedItem) => {
          console.log('Item updated successfully:', updatedItem);
          // Handle any additional logic after successful update
          this.router.navigate(['/schedule']); // Redirect to item list or any other route
        },
        (error) => {
          console.error('Error updating item:', error);
        }
      );
    } else {
      // Add new item
      this.itemService.addItem(formData).subscribe(
        (newItem) => {
          console.log('Item added successfully:', newItem);
          // Handle any additional logic after successful addition
          this.router.navigate(['/schedule']); // Redirect to item list or any other route
        },
        (error) => {
          console.error('Error adding item:', error);
        }
      );
    }
  }


  loadItems(): void {
    this.itemService.getItems().subscribe(
      (items) => {
        this.item = items;
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

showDetails(itemId: string): void {
  this.router.navigate(['/items', itemId]);
}

updateItem(itemId: string): void {
  this.router.navigate(['/schedule', itemId, 'edit']);
}


deleteItem(itemId: string): void {
  if (confirm('Are you sure you want to delete this item?')) {
    this.itemService.deleteItem(itemId).subscribe(
      () => {
        console.log('Item deleted successfully:', itemId);
        this.loadItems(); // Reload the items after deletion
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
  }
}
}

