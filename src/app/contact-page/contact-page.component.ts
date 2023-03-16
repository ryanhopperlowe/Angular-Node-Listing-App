import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fakeListings } from '../fake-data';
import { Listing } from '../types';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {
  email = '';
  message = '';
  listing?: Listing;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.listing = fakeListings.find((item) => item.id === id);
    this.message = `Hi, I'm interested in your ${this.listing?.name.toLowerCase()}!`
  }

  sendMessage() {
    alert('Your message has been sent!');
    this.router.navigateByUrl('/listings');
  }
}
