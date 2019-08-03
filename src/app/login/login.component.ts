import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 constructor(private router: Router) {}

  ngOnInit() {

    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '464132267711853',
        cookie     : true,
        xfbml      : true,
        version    : 'v1.0'
      });
      FB.AppEvents.logPageView();
    };

    ( function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

  fbLogin() {
    console.log('submit login to facebook');
    // FB.login();
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        console.log('User login successful');
      } else {
        console.log('User login failed');
      }
    });
  }

  verifyCredentials() {
    console.log('credentials Accepted');
    this.router.navigateByUrl('item');
  }
}
