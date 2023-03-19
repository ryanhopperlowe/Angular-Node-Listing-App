import { Component } from '@angular/core';
import { fakeMyListings } from '../fake-data';
import { ListingsService } from '../listings.service';
import { Listing } from '../types';

@Component({
  selector: 'app-my-listings-page',
  templateUrl: './my-listings-page.component.html',
  styleUrls: ['./my-listings-page.component.scss']
})
export class MyListingsPageComponent {
  listings?: Listing[];

  constructor(
    private listingService: ListingsService
  ) {}

  ngOnInit() {
    this.listingService.getUserListings('12345')
      .subscribe((listings) => this.listings = listings)
  }

  onDeleteClick(listingId: string) {
    // this method will not be available when listings are not loaded
    // can assume listings is populated
    this.listingService.deleteListing(listingId)
      .subscribe(() => {
        this.listings = this.listings!.filter(({ id }) => id !== listingId)
      });
  }
}
