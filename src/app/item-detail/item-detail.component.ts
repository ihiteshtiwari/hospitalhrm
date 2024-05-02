import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: any;

  constructor(private route: ActivatedRoute, private itemService: ItemService) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.params['id'];
    this.itemService.getItem(itemId).subscribe(item => {
      this.item = item;

      // Construct the image URL
      if (this.item && this.item.image) {
        this.item.image = `http://localhost:3000${this.item.image}`;
      }
    });
  }
}
