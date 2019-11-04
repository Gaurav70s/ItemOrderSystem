import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Item} from '../_models/item';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {}

  public getCartItems(): Observable<Item[]> {
    return this.http.get<Item[]>('./assets/data/cart.json').pipe(
      catchError(this.handleError<Item[]>('getCartItems', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
