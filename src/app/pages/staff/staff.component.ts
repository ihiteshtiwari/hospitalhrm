import { Component , OnInit } from '@angular/core';
import { ItemService } from '../../item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent implements OnInit {
  items: any[];
  totalItems: number;
  departments: string[];
  selectedDepartment: string;
  
  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe(
      (items) => {
        this.items = items;
        this.totalItems = this.items.length; // Counting total items
        this.departments = this.extractDepartments(items); // Extracting departments
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  extractDepartments(items: any[]): string[] {
    const departmentsSet = new Set<string>();
    items.forEach(item => {
      departmentsSet.add(item.department);
    });
    return Array.from(departmentsSet);
  }

  applyFilter(event: any): void {
    this.selectedDepartment = event.target.value;
  }

  get filteredItems(): any[] {
    if (!this.selectedDepartment || this.selectedDepartment === '') {
      return this.items;
    } else {
      return this.items.filter(item => item.department === this.selectedDepartment);
    }
  }
  showDetails(itemId: string): void {
    this.router.navigate(['/items', itemId]);
  }

  updateItem(itemId: string): void {
    this.router.navigate(['/items', itemId, 'edit']);
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
