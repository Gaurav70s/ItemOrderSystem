import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Ingredient} from '../_models/Ingredient';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) {
  }

  public getAllIngredients(): Observable<Ingredient[]> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const options = {headers, crossDomain: true, withCredentials: true};
    return this.http.get<Ingredient[]>('/rest/item_order_service/v1/ingredient/all', options)
      .pipe(catchError(this.handleError<Ingredient[]>('placeOrder', [])));

  }

  public createIngredient(ingredient: Ingredient): Observable<boolean> {

    console.log('Ingredient' + ingredient.name);
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const options = {headers, crossDomain: true, withCredentials: true};
    return this.http.post<boolean>('/rest/item_order_service/v1/ingredient', ingredient, options)
      .pipe(catchError(this.handleError<boolean>('placeOrder', false)));

  }

  public updateIngredient(ingredient: Ingredient): Observable<boolean> {
    console.log('Ingredient' + ingredient.name);
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const options = {headers, crossDomain: true, withCredentials: true};
    return this.http.put<boolean>('/rest/item_order_service/v1/ingredient/' + ingredient.id, ingredient, options)
      .pipe(catchError(this.handleError<boolean>('placeOrder', false)));

  }

  deleteIngredients(id: number): Observable<boolean> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const options = {headers, crossDomain: true, withCredentials: true};
    return this.http.delete<boolean>('/rest/item_order_service/v1/ingredient/' + id, options)
      .pipe(catchError(this.handleError<boolean>('placeOrder', false)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

