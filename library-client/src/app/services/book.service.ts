import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../interfaces/book';
import {BOOKS_URL} from '../../environments/environment';
import {BookList} from '../interfaces/book-list';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private BOOK_INFO: string = 'book.info.json';
  private BOOK_LIST: string = 'books.info.json';

  constructor(private http: HttpClient) { }

  getBookInfoById(id: number): Observable<Book>{
    return this.http.get<Book>(`${BOOKS_URL}/${id}/${this.BOOK_INFO}`);
  }

  getAllBooks(): Observable<BookList> {
    return this.http.get<BookList>(`${BOOKS_URL}/${this.BOOK_LIST}`)
  }

}
