import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Menu} from '../_models/Menu';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  menus: Menu[];

  constructor(private http: HttpClient) {
  }

  public getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>('./assets/data/app-menu.json').pipe(
      catchError(this.handleError<Menu[]>('getMenus', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
