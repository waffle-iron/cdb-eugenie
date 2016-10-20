// app/auth.service.ts
import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Headers, Http } from '@angular/http';

// Avoid name not found warnings
declare var Auth0Lock : any;

@Injectable()
export class AuthService {
  private usersUrl = 'api/users';  // URL to web api
  private headers = new Headers({ 'Content-Type': 'application/json' });

  userProfile : any;

  // Configure Auth0
  lock = new Auth0Lock('r2Y8BGhSsDqsHt7uUg1eGGAlTotfRuaC', 'yvesgirard.eu.auth0.com', {
    auth: { 
      redirect: false 
    }
  });

  constructor(private http: Http) {
    console.log("constructor")
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {

      console.log("authenticated")

      localStorage.setItem('id_token', authResult.idToken);
      
      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {

        if (error) {
          // Handle error
          console.log(error);
          return;
        }

        profile.user_metadata = profile.user_metadata || {};
        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
      });
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
  };
}