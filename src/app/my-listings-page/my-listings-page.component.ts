import { Component } from '@angular/core';
import { fakeMyListings } from '../fake-data';
import { Listing } from '../types';

@Component({
  selector: 'app-my-listings-page',
  templateUrl: './my-listings-page.component.html',
  styleUrls: ['./my-listings-page.component.scss']
})
export class MyListingsPageComponent {
  listings: Listing[] = [];

  ngOnInit() {
    this.listings = fakeMyListings;
  }

  onDeleteClick(listingId: string) {
    alert(`Deleting your listing with id ${listingId}`);
  }
}
