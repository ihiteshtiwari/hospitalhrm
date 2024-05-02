import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-staffview',
  templateUrl: './staffview.component.html',
  styleUrls: ['./staffview.component.css']
})
export class StaffviewComponent implements OnInit {
  items: any[] = [];
  morningItems: any[] = [];
  afternoonItems: any[] = [];
  eveningItems: any[] = [];
  nightItems: any[] = [];
  morningItemCount: number = 0;
  afternoonItemCount: number = 0;
  eveningItemCount: number = 0;
  nightItemCount: number = 0;
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
          this.items.push(item);
          this.filterItemsByShift();
        },
        (error) => {
          console.error('Error loading item for editing:', error);
        }
      );
    } else {
      this.itemService.getItems().subscribe(
        (items) => {
          this.items = items;
          this.filterItemsByShift();
        },
        (error) => {
          console.error('Error loading items:', error);
        }
      );
    }
  }

  filterItemsByShift(): void {
    this.items.forEach((item) => {
      switch (item.shift) {
        case 'Morning':
          this.morningItems.push(item);
          this.morningItemCount++;
          break;
        case 'Afternoon':
          this.afternoonItems.push(item);
          this.afternoonItemCount++;
          break;
        case 'Evening':
          this.eveningItems.push(item);
          this.eveningItemCount++;
          break;
        case 'Night':
          this.nightItems.push(item);
          this.nightItemCount++;
          break;
        default:
          break;
      }
    });
  }
}
