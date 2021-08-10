import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BillingDashboard} from './_models/BillingDashboard';


@Injectable({
  providedIn: 'root'
})
export class BillingServiceService {

  constructor(private http: HttpClient) { }

  getDailyBillingData(date: string): Observable<BillingDashboard[]>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = { headers, crossDomain: true, withCredentials: true };
    return this.http.get<BillingDashboard[]>('/rest/item_order_service/v1/dashboard/billing/'+date, options);
  }

  getMonthlyBillingData(month: number, fullYear: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = { headers, crossDomain: true, withCredentials: true };
    return this.http.get<BillingDashboard[]>('/rest/item_order_service/v1/dashboard/billing/'+fullYear+'/'+month, options);
  }
}
