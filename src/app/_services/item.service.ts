import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Item} from '../_models/Item';
import {catchError} from 'rxjs/operators';
import {ItemsOnCart} from '../_models/ItemsOnCart';
import {CategoryWiseItem} from "../_models/CategoryWiseItem";
import {ItemCategory} from "../_models/ItemCategory";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: ItemsOnCart[];
  constructor(private http: HttpClient) {
    this.items = JSON.parse(localStorage.getItem('cartItem'));
  }

  public getCategoryWiseItems(): Observable<CategoryWiseItem[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = { headers, crossDomain: true, withCredentials: true };
    return this.http.get<CategoryWiseItem[]>('/rest/item_order_service/v1/item/allCategoryWise', options).pipe(
    catchError(this.handleError<CategoryWiseItem[]>('getItems', [])));
  }

  public getAllItems(): Observable<Item[]> {
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

  public addToCart(itemOnCart: ItemsOnCart): void {
    // console.log(item);
    // localStorage.setItem(`cartItem`, JSON.stringify("[]"))
    if (this.items.findIndex(value => value.item.id === itemOnCart.item.id) !== -1) {
      this.items = this.items.filter(value => value.item.id !== itemOnCart.item.id);
    }
    this.items.push(itemOnCart);
    localStorage.setItem(`cartItem`, JSON.stringify(this.items));
    console.log(this.items);
    /*const blob = new Blob([JSON.stringify(item)], { type: 'application/json'});
    fs.saveAs(blob, '/asset/data/cart.json');*/
  }

  public createItem(item: Item) {
    console.log(JSON.stringify(item));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = { headers, crossDomain: true, withCredentials: true };
    return this.http.post<any>('/rest/item_order_service/v1/item', item, options);
  }

  updateItem(item: Item):Observable<number> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = { headers, crossDomain: true, withCredentials: true };
    return this.http.put<number>('/rest/item_order_service/v1/item/'+ item.id, item, options);
  }

  deleteItem(id: number):Observable<number> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = { headers, crossDomain: true, withCredentials: true };
    return this.http.delete<number>('/rest/item_order_service/v1/item/'+id, options);
  }

  getAllItemCategory():Observable<ItemCategory[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = { headers, crossDomain: true, withCredentials: true };
    return this.http.get<ItemCategory[]>('/rest/item_order_service/v1/category/all', options).pipe(
      catchError(this.handleError<ItemCategory[]>('getItemCategories', [])));
  }

  cerateCategory(itemCategory: ItemCategory):Observable<number> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = { headers, crossDomain: true, withCredentials: true };
    return this.http.post<number>('/rest/item_order_service/v1/category', itemCategory, options);
  }

  updateCategory(itemCategory: ItemCategory):Observable<number> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = { headers, crossDomain: true, withCredentials: true };
    return this.http.put<number>('/rest/item_order_service/v1/category/'+ itemCategory.categoryId, itemCategory, options);
  }

  deleteCategory(id: number):Observable<number> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = { headers, crossDomain: true, withCredentials: true };
    return this.http.delete<number>('/rest/item_order_service/v1/category/'+id, options);
  }
}

