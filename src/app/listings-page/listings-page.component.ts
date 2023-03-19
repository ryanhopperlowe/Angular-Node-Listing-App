import { Component } from '@angular/core';
import { fakeListings } from '../fake-data';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-listings-page',
  templateUrl: './listings-page.component.html',
  styleUrls: ['./listings-page.component.scss']
})
export class ListingsPageComponent {
  listings: Listing[] = [];

  constructor(
    private listingsService: ListingsService
  ) {}

  private setListings(listings: Listing[]) {
    this.listings = listings;
  }

  ngOnInit(): void {
    this.listingsService.getListings()
      .subscribe((listings) => this.listings = listings);
  }
}
