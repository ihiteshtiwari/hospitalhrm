import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../item.service'; // Import the ItemService

@Component({
  selector: 'app-timeoff',
  templateUrl: './timeoff.component.html',
  styleUrls: ['./timeoff.component.css']
})
export class TimeoffComponent implements OnInit {
  items: any[]; // Assuming your item data is of type array

  constructor(private itemService: ItemService) { } // Inject the ItemService

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    // Call the method from ItemService to fetch items
    this.itemService.getItems().subscribe(
      (items) => {
        this.items = items;
      },
      (error) => {
        console.error('Error loading items:', error);
      }
    );
  }

  approveItem(item: any): void {
    // Call the service method to approve the item
    this.itemService.approveItem(item._id).subscribe(
      (response) => {
        // Update the status locally upon successful approval
        item.status = 'Approved';
        console.log('Item approved:', item);
      },
      (error) => {
        console.error('Error approving item:', error);
      }
    );
  }

  rejectItem(item: any): void {
    // Call the service method to reject the item
    this.itemService.rejectItem(item._id).subscribe(
      (response) => {
        // Update the status locally upon successful rejection
        item.status = 'Rejected';
        console.log('Item rejected:', item);
      },
      (error) => {
        console.error('Error rejecting item:', error);
      }
    );
  }
}
