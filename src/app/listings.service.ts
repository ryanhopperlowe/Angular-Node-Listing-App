import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Listing, NewListing } from './types';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  constructor(
    private http: HttpClient
  ) { }

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings');
  }

  getUserListings(userId: string) {
    return this.http.get<Listing[]>(`/api/users/${userId}/listings`);
  }

  getListingById(id: string) {
    return this.http.get<Listing>(`/api/listings/${id}`);
  }

  addViewToListing(id: string) {
    return this.http.post(
      `/api/listings/${id}/add-view`,
      {},
      httpOptions
    );
  }

  createNewListing(details: NewListing) {
    return this.http.post<Listing>(
      '/api/listings',
      details,
      httpOptions 
    );
  }

  updateListing(id: string, details: NewListing) {
    return this.http.post(
      `/api/listings/${id}`,
      details,
      httpOptions
    );
  }

  deleteListing(id: string) {
    return this.http.delete(`/api/listings/${id}`);
  }
}