import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fakeListings, fakeMyListings } from '../fake-data';
import { Listing } from '../types';

@Component({
  selector: 'app-edit-listing-page',
  templateUrl: './edit-listing-page.component.html',
  styleUrls: ['./edit-listing-page.component.scss']
})
export class EditListingPageComponent {
  listing!: Listing;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const listingId = this.route.snapshot.paramMap.get('id');
    
    this.listing = fakeMyListings.find(({ id }) => id === listingId)!;
    console.log(this.listing);
  }

  onSubmit() {
    alert('Saving Changes...');
    this.router.navigateByUrl('/my-listings');
  }
}
