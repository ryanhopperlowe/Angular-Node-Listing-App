import { Component } from '@angular/core';
import { ProfileService } from '../profile.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent {

  constructor(
    public auth: AngularFireAuth,
    private profileService: ProfileService
  ) { }

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
