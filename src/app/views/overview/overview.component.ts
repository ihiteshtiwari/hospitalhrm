import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
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
}
