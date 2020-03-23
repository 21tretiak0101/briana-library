import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BOOKS_URL, CONTACTS_URL, MAIN_URL} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  getContent(bookId: number, path: string): Observable<string>{
    return this.http.get(`${BOOKS_URL}/${bookId}/content/${path}`,
      {observe: 'body', responseType: 'text'})
  }

  getContactsContent(): Observable<string> {
    return this.http.get(CONTACTS_URL, {observe: 'body', responseType: 'text'});
  }

  getMainContent(): Observable<string> {
    return this.http.get(MAIN_URL, {observe: 'body', responseType: 'text'});
  }
}
