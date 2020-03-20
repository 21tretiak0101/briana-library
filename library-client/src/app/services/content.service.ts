import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BOOKS_URL} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  private CONTENT: string = 'content.html';

  getContent(bookId: number, chapterId: number): Observable<string>{
    return this.http.get(`${BOOKS_URL}/${bookId}/chapters/${chapterId}/${this.CONTENT}`,
      {observe: 'body', responseType: 'text'})
  }
}
