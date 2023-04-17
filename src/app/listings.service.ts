import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { Listing, NewListing } from './types';

interface HttpOptions {
  headers: HttpHeaders;
}

const httpOptions: HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

const httpOptionsWithAuthToken = (token: string) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'AuthToken': token,
    'Authorization': token
  })
})

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth
  ) { }

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings');
  }

  getUserListings() {
    return this.authorized((userId, options) => {
      return this.http.get<Listing[]>(
        `/api/users/${userId}/listings`,
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

  private authorized<T = unknown>(cb: (userId: string, options: any) => Observable<HttpEvent<T>>) {
    return new Observable<T>((observer) => {
      this.auth.user.subscribe(async (user) => {
        if (user) {
          const token = await user.getIdToken();

          if (token) {
            cb(user.uid, httpOptionsWithAuthToken(token))
              .subscribe((data) => observer.next(data as T));
          }
        }
      })
    })
  }
}