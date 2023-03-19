import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../listings.service';
import { Listing } from '../types';

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.scss']
})
export class ListingDetailComponent {
  isLoading = true;
  listing: Listing | null = null;

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.listingService.getListingById(id)
      .subscribe((listing) => {
        this.listing = listing
        this.isLoading = false;
      });

    this.listingService.addViewToListing(id)
      .subscribe(() => console.log('views updated!'))
  }
}
