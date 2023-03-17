import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { fakeListings } from '../fake-data';
import { Listing, NewListing } from '../types';

@Component({
  selector: 'app-listing-data-form',
  templateUrl: './listing-data-form.component.html',
  styleUrls: ['./listing-data-form.component.scss']
})
export class ListingDataFormComponent {
  @Input() buttonText!: string;
  @Input() currentName: string = '';
  @Input() currentDescription: string = '';
  @Input() currentPrice: string = '';

  @Output() onSubmit = new EventEmitter<NewListing>();
  
  name = '';
  description = '';
  price = '';

  ngOnInit() {
    this.name = this.currentName;
    this.description = this.currentDescription;
    this.price = this.currentPrice;
  }

  onSubmitClick() {
    this.onSubmit.emit({
      name: this.name,
      description: this.description,
      price: +this.price
    })
  }
}
