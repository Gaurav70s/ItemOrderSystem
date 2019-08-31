import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider, SocialUser} from 'angularx-social-login';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
// import { MustMatch } from './_helpers/must-match.validator';

// declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  user: SocialUser;

  isSubmitted  =  false;

  endTime = new Date();

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
    });

    this.verifyCredentials();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
      console.log(x);
      this.router.navigateByUrl('/item');
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => {
      console.log(x);
      this.router.navigateByUrl('/item');
    });
  }

  signInWithLinkedIn(): void {
    this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID).then(x => console.log(x));
  }

  signOut(): void {
    this.authService.signOut();
  }

  verifyCredentials() {
    console.log('credentials Accepted');
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    console.log(this.loginForm.valid);
    console.log(this.loginForm);
    if (this.loginForm.valid) {
      this.router.navigateByUrl('item');
    }

    console.log(this.loginForm.getRawValue());

  }

  get formControls() { return this.loginForm.controls; }

  login() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    // this.authService.login(this.loginForm.value);
    this.router.navigateByUrl('/item');
  }
}
