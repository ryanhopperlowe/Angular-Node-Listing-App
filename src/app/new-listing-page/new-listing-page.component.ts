import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListingsService } from '../listings.service';
import { NewListing } from '../types';

@Component({
  selector: 'app-new-listing-page',
  templateUrl: './new-listing-page.component.html',
  styleUrls: ['./new-listing-page.component.scss']
})
export class NewListingPageComponent {
  constructor(
    private router: Router,
    private listingService: ListingsService
  ) {}

  onSubmit(newListing: NewListing) {
    this.listingService.createNewListing(newListing).subscribe(() => {
      this.router.navigateByUrl('/my-listings');
    });
  }
}
