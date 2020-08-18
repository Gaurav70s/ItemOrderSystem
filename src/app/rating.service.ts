import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) {}

  public submitRating(rating :number, invoiceid: string): Observable<boolean> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const options = {headers, crossDomain: true, withCredentials: true};
    return this.http.post<boolean>('/rest/item_order_service/v1/rating/'+ invoiceid+"/"+rating , options)
  }
}
