import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Item} from '../_models/item';
import {catchError} from 'rxjs/operators';
import {ItemOnCart} from '../_models/itemOnCart';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: Item[];
  constructor(private http: HttpClient) {
    this.items = JSON.parse(localStorage.getItem("cartItem"));
  }

  public getItems(): Observable<Item[]> {
    return this.http.get<Item[]>('./assets/data/items.json').pipe(
    catchError(this.handleError<Item[]>('getItems', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public addToCart(item: Item): void {
    //console.log(item);
    //localStorage.setItem(`cartItem`, JSON.stringify("[]"))
    if(this.items.findIndex(value => { return value.id === item.id}) !== -1){
      this.items = this.items.filter(value => { return value.id !== item.id});
    }
    this.items.push(item)
    localStorage.setItem(`cartItem`, JSON.stringify(this.items));
    console.log(this.items)
    /*const blob = new Blob([JSON.stringify(item)], { type: 'application/json'});
    fs.saveAs(blob, '/asset/data/cart.json');*/
  }
  public getKOT(){
    return this.http.get<Item[]>('./assets/data/kot.json').pipe(
      catchError(this.handleError<Item[]>('getItems', [])));


  }
}
