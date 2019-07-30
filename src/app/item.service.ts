import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Item} from './item';
import {catchError} from 'rxjs/operators';
import {ItemOnCart} from './itemOnCart';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) {}

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
    console.log(item);

    /*const blob = new Blob([JSON.stringify(item)], { type: 'application/json'});
    fs.saveAs(blob, '/asset/data/cart.json');*/
  }
}
