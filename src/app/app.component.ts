import { ProfileService } from './profile.service';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'buy-and-sell';

  constructor(
    public auth: AngularFireAuth,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.profileService.initProfile();
  }

  async signInClicked() {
    const res = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    if (res.user) {
      this.profileService.initProfile();
    }
  }

  signOutClicked() {
    this.auth.signOut();
  }
}
