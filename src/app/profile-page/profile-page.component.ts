import { ProfileService } from './../profile.service';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Profile } from '../types';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  profile?: Profile;

  constructor(
    private auth: AngularFireAuth,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.profileService.profile$
      .subscribe((profile) => {
        this.profile = profile;
      })
  }
}
