import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { httpOptionsWithAuthToken } from 'src/lib/auth';
import { Profile, ProfileInfo } from './types';
import { Observable, ReplaySubject } from 'rxjs';
import { RootService } from 'src/service/root-service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends RootService {
  private profile = new ReplaySubject<Profile>(1);

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth
  ) {
    super(auth);
  }

  initProfile() {
    this.getOrCreateProfile()
      .subscribe((profile) => {
        this.profile.next(profile);
      });
  }

  get profile$() {
    return this.profile.asObservable();
  }

  getOrCreateProfile() {
    return this.authorized((user, options) => {
      const base = `/api/profile/${user.uid}`;
      const searchParams = new URLSearchParams({
        create: 'true',
        email: String(user.email)
      });

      const url = `${base}?${searchParams.toString()}`;

      return this.http.get<Profile>(url, options);
    });
  }

  createProfile(details: ProfileInfo) {
    return this.authorized((user, options) => {
      return this.http.post<Profile>(
        `/api/profile/${user.uid}`,
        details,
        options
      );
    });
  }
}
