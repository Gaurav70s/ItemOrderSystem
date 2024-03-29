import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Item} from '../_models/Item';
import {catchError} from 'rxjs/operators';
import {Order} from '../_models/Order';
import {KotDashboard} from '../_models/KotDashboard';
import {OrderDetail} from '../_models/OrderDetails';
import {OrderItem} from '../_models/OrderItem';
import {Subscriptions} from '../_models/Subscriptions';
import {User} from '../_models/User';
import {Payment} from '../_models/Payment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order: Order;
  order_no: string;

  constructor(private http: HttpClient) {
  }

  /*public getCartItems(): Observable<Item[]> {
    return this.http.get<Item[]>('./assets/data/cart.json').pipe(
      catchError(this.handleError<Item[]>('getCartItems', [])));
  }*/

  public placeOrder(orderDetail: OrderDetail): Observable<OrderDetail> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const options = {headers, crossDomain: true, withCredentials: true};
    return this.http.post<OrderDetail>('/rest/item_order_service/v1/order', orderDetail, options)
      .pipe(catchError(this.handleError<OrderDetail>('placeOrder', null)));
  }

  public updateOrderStatus(order: Order): Observable<Order> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const options = {headers, crossDomain: true, withCredentials: true};
    return this.http.put<Order>('/rest/item_order_service/v1/order/status', order, options)
      .pipe(catchError(this.handleError<Order>('updateStatus', null)));
  }

  public updateOrderItemStatus(orderItem: OrderItem, status: boolean): Observable<boolean> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const options = {headers, crossDomain: true, withCredentials: true};
    return this.http.put<boolean>('/rest/item_order_service/v1/order/item/status/' + status, orderItem, options)
      .pipe(catchError(this.handleError<boolean>('updateOrderItemStatus', false)));
  }

  public completeOrder(order: Order): Observable<number> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const options = {headers, crossDomain: true, withCredentials: true};
    return this.http.put<number>('/rest/item_order_service/v1/order/' + order.orderId + '/complete', order, options)
      .pipe(catchError(this.handleError<number>('updateStatus', 0)));
  }

  public getInvoice(): Observable<Item[]> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const options = {headers, crossDomain: true, withCredentials: true};
    return this.http.get<Item[]>('/rest/item_order_service/v1/Order/invoice', options).pipe(
      catchError(this.handleError<Item[]>('getInvoice', [])));
  }

  public getKotDashboard(): Observable<KotDashboard> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const options = {headers, crossDomain: true, withCredentials: true};
    return this.http.get<KotDashboard>('/rest/item_order_service/v1/dashboard/kot', options).pipe(
      catchError(this.handleError<KotDashboard>('getKotDashboard', new KotDashboard())));
  }

  public getKOTOrderData(): Observable<OrderDetail[]> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const options = {headers, crossDomain: true, withCredentials: true};
    return this.http.get<OrderDetail[]>('/rest/item_order_service/v1/dashboard/kot/orders', options);
  }

  public checkSubscription(user: User): Observable<Subscriptions> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const options = {headers, crossDomain: true, withCredentials: true};
    return this.http.post<Subscriptions>('/rest/item_order_service/v1/subscription/check', user, options).pipe(
      catchError(this.handleError<Subscriptions>('subscription', null)));
  }

  public updatePayment(payment: Payment, tableId: string): Observable<string> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const options = {headers, crossDomain: true, withCredentials: true};
    return this.http.post<string>('/rest/item_order_service/v1/order/table/' + tableId + '/payment', payment, options);
  }

  public getOrdersByTable(tableNo: string): Observable<Payment> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const options = {headers, crossDomain: true, withCredentials: true};
    return this.http.get<Payment>('/rest/item_order_service/v1/order/table/' + tableNo, options).pipe(
      catchError(this.handleError<Payment>('getKotDashboard', null)));
  }

  getOTP(subscriptionId: number) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const options = {headers, crossDomain: true, withCredentials: true};
    return this.http.get<boolean>('/rest/item_order_service/v1/subscription/' + subscriptionId + '/generateOtp', options);

  }

  verifyOtp(otp: number, subscriptionId: number) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const options = {headers, crossDomain: true, withCredentials: true};
    return this.http.get<boolean>('/rest/item_order_service/v1/subscription/' + subscriptionId + '/' + otp + '/verify', options);
  }

  public getPaymentsByTable(tableNo: string): Observable<Payment[]> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const options = {headers, crossDomain: true, withCredentials: true};
    return this.http.get<Payment[]>('/rest/item_order_service/v1/order/payment/' + tableNo, options).pipe(
      catchError(this.handleError<Payment[]>('getKotDashboard', null)));
  }

  savePayment(payment: Payment): Observable<number> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const options = {headers, crossDomain: true, withCredentials: true};
    return this.http.post<number>('/rest/item_order_service/v1/order/save_payment/', payment, options);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
