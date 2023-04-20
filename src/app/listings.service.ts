import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { Listing, NewListing } from './types';
import { httpOptions } from 'src/lib/auth';
import { RootService } from 'src/service/root-service';

@Injectable({
  providedIn: 'root'
})
export class ListingsService extends RootService {

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth
  ) {
    super(auth);
  }

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings');
  }

  getUserListings() {
    return this.authorized((user, options) => {
      return this.http.get<Listing[]>(
        `/api/users/${user.uid}/listings`,
        options
      );
    });
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
    return this.authorized((_, options) => {
      return this.http.post<Listing>(
        '/api/listings',
        details,
        options 
      );
    })
  }

  updateListing(id: string, details: NewListing) {
    return this.authorized((_, options) => {
      return this.http.post<unknown>(
        `/api/listings/${id}`,
        details,
        options
      );
    })
  }

  deleteListing(id: string) {
    return this.authorized((_, options) => {
      return this.http.delete<never>(
        `/api/listings/${id}`,
         options
        );
    })
  }
}