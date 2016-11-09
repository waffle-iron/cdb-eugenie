import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';

const TITLES = [
  { id: 1, title: 'Monsieur' },
  { id: 2, title: 'Madame' },
  { id: 3, title: 'Mademoiselle' },
];

@Component({
  moduleId: module.id,
  selector: 'user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: [ 'user-profile.component.css' ]
})

export class UserProfileComponent implements OnInit {
  userProfile: User;
  titles = TITLES;

  constructor(
    private AuthService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    if (!this.AuthService.authenticated()) {
       this.gotoRoot();
    }

    this.userProfile = this.AuthService.getUserProfile()
    //this.userProfile.title = 1;
  }

  gotoRoot(): void {
    let link = ['/'];
    this.router.navigate(link);
  }
}
