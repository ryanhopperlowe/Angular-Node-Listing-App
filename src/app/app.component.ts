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
  ) { }

  signInClicked() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  signOutClicked() {
    this.auth.signOut();
  }
}
