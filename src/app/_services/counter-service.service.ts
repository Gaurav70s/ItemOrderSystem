import { Injectable } from '@angular/core';
import {CounterDashboard} from "../_models/CounterDashboard";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CounterServiceService {

  private dashboard: CounterDashboard[];

  constructor(private http: HttpClient) { }

  public getCounterDashboard(){
    return this.http.get<CounterDashboard[]>('./assets/data/counter-dashboard.json').pipe(
      catchError(this.handleError<CounterDashboard[]>('getCounterDashboard', [])));

  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
