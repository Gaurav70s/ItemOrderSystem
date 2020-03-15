import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {LoginUser} from "../_models/LoginUser";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<LoginUser>;
  public currentUser: Observable<LoginUser>;

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
    this.currentUserSubject = new BehaviorSubject<LoginUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginUser {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>('/rest/item_order_service/v1/users/authenticate', { username, password })
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data && data.token) {
          // store data details and jwt token in local storage to keep data logged in between page refreshes
          this.saveToken(data.token)
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.currentUserSubject.next(data);
        }

        return data;
      }));
  }

  saveToken(token){
    const expireDate = new Date().getTime() + (1000 * 5 * 60 * 60);
    this.cookieService.set("access_token", token, expireDate);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
