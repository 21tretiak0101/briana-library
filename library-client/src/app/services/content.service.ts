import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

import {BOOKS_URL, STATIC_URL} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  private CONFIG_FILENAME: string = 'static.info.json';

  getBookContent(bookId: number, path: string): Observable<string>{
    return this.http.get(`${BOOKS_URL}/${bookId}/${path}`,
      {observe: 'body', responseType: 'text'})
  }

  getStaticContentByPageName(pageName: string): Observable<string> {

    const subject: Subject<string> = new Subject<string>();

    this.http.get(`${STATIC_URL}/${this.CONFIG_FILENAME}`).subscribe( config => {
      this.http.get(`${STATIC_URL}/${config[pageName]}`, {observe: 'body', responseType: 'text'})
        .subscribe( content => {
          subject.next(content);
        });
    });

    return subject.asObservable();
  }
}
