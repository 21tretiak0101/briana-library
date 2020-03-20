import { Injectable } from '@angular/core';
import {BookService} from './book.service';
import {Chapter} from '../interfaces/chapter';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private bookService: BookService) { }

  public getChapter(bookId: number, chapterId: number): Observable<Chapter>{

    const subject: Subject<Chapter> = new Subject<Chapter>();

    this.bookService.getBookInfoById(bookId).subscribe( book => {
      const chapter: Chapter = book.chapters.find(c => c.id === chapterId);
      subject.next(chapter)
    });

    return subject.asObservable();
  }
}
