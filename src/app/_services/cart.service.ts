import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Item} from '../_models/item';
import {catchError} from 'rxjs/operators';
import {Order} from '../_models/Order';
import {ItemOnCart} from '../_models/itemOnCart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  order: Order;
  constructor(private http: HttpClient) {}

  public getCartItems(): Observable<Item[]> {
    return this.http.get<Item[]>('./assets/data/cart.json').pipe(
      catchError(this.handleError<Item[]>('getCartItems', [])));
  }

  public placeOrder(itemsOnCart: ItemOnCart[]): Order {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = { headers, crossDomain: true, withCredentials: true };
    this.http.post('/rest/item_order_service/v1/cart', itemsOnCart, options).subscribe(data => this.order === data );
    return this.order;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
