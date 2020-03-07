import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Item} from '../_models/Item';
import {catchError} from 'rxjs/operators';
import {Order} from '../_models/Order';
import {KotDashboard} from '../_models/KotDashboard';
import {OrderDetail} from "../_models/OrderDetails";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order: Order;
  // tslint:disable-next-line:variable-name
  order_no: string;
  constructor(private http: HttpClient) {}

  /*public getCartItems(): Observable<Item[]> {
    return this.http.get<Item[]>('./assets/data/cart.json').pipe(
      catchError(this.handleError<Item[]>('getCartItems', [])));
  }*/

  public placeOrder(orderDetail: OrderDetail): Observable<OrderDetail> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = { headers, crossDomain: true, withCredentials: true };
    return this.http.post<OrderDetail>('/rest/item_order_service/v1/order', orderDetail, options)
      .pipe(catchError(this.handleError<OrderDetail>('placeOrder', null)));
  }

  public updateStatus(order: Order): Observable<Order> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = { headers, crossDomain: true, withCredentials: true };
    return this.http.put<Order>('/rest/item_order_service/v1/order/status', order, options)
      .pipe(catchError(this.handleError<Order>('updateStatus', null)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  public getInvoice(): Observable<Item[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = { headers, crossDomain: true, withCredentials: true };
    return this.http.get<Item[]>('/rest/item_order_service/v1/Order/invoice', options).pipe(
      catchError(this.handleError<Item[]>('getInvoice', [])));
  }
  public getKotDashboard(): Observable<KotDashboard> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = { headers, crossDomain: true, withCredentials: true };
    return this.http.get<KotDashboard>('/rest/item_order_service/v1/dashboard/kot', options).pipe(
      catchError(this.handleError<KotDashboard>('getKotDashboard', new KotDashboard())));
  }
}
