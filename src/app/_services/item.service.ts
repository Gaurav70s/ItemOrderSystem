import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Item} from '../_models/item';
import {catchError} from 'rxjs/operators';
import {ItemOnCart} from '../_models/itemOnCart';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: ItemOnCart[];
  constructor(private http: HttpClient) {
    this.items = JSON.parse(localStorage.getItem('cartItem'));
  }

  public getItems(): Observable<Item[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = { headers, crossDomain: true, withCredentials: true };
    return this.http.get<Item[]>('/rest/item_order_service/v1/item/all', options).pipe(
    catchError(this.handleError<Item[]>('getItems', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public addToCart(item: Item, quantity: number): void {
    // console.log(item);
    // localStorage.setItem(`cartItem`, JSON.stringify("[]"))
    if (this.items.findIndex(value => value.item.id === item.id) !== -1) {
      this.items = this.items.filter(value => value.item.id !== item.id);
    }
    this.items.push(new ItemOnCart(item, quantity));
    localStorage.setItem(`cartItem`, JSON.stringify(this.items));
    console.log(this.items);
    /*const blob = new Blob([JSON.stringify(item)], { type: 'application/json'});
    fs.saveAs(blob, '/asset/data/cart.json');*/
  }
  public getKOT() {
    return this.http.get<Item[]>('./assets/data/kot.json').pipe(
      catchError(this.handleError<Item[]>('getItems', [])));
  }
  public createItem(item: Item) {
    console.log(JSON.stringify(item));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = { headers, crossDomain: true, withCredentials: true };
    return this.http.post<any>('/rest/item_order_service/v1/item', item, options).subscribe(res => console.log(res.toString()) );
  }
}

