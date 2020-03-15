import { Injectable } from '@angular/core';
import {CounterDashboard} from '../_models/CounterDashboard';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Table} from "../_models/Table";

@Injectable({
  providedIn: 'root'
})
export class CounterServiceService {

  constructor(private http: HttpClient) { }

  public getCounterDashboard(): Observable<Table[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = { headers, crossDomain: true, withCredentials: true };
    return this.http.get<Table[]>('/rest/item_order_service/v1/table/all', options)
      .pipe(catchError(this.handleError<Table[]>('getCounterDashboard', null)));

  }
  public getAvailableTables() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = { headers, crossDomain: true, withCredentials: true };
    return this.http.get<Table[]>('/rest/item_order_service/v1/table/status/available', options)
      .pipe(catchError(this.handleError<Table[]>('getCounterDashboard', null)));

  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
