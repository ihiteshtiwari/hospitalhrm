// item-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: any[];

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe(
      (items) => {
        this.items = items;
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
