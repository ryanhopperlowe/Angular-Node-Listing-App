import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fakeListings, fakeMyListings } from '../fake-data';
import { ListingsService } from '../listings.service';
import { Listing, NewListing } from '../types';

@Component({
  selector: 'app-edit-listing-page',
  templateUrl: './edit-listing-page.component.html',
  styleUrls: ['./edit-listing-page.component.scss']
})
export class EditListingPageComponent {
  listing?: Listing;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingService: ListingsService
  ) {}

  ngOnInit() {
    const listingId = this.route.snapshot.paramMap.get('id')!;
    
    this.listingService.getListingById(listingId)
      .subscribe((listing) => this.listing = listing);
  }

  onSubmit(changes: NewListing) {
    // onSubmit will not be available in DOM unless the listing is loaded
    this.listingService.updateListing(this.listing!.id, changes)
      .subscribe(() => {
        this.router.navigateByUrl('/my-listings');
      });
  }
}
