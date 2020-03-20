import { Injectable } from '@angular/core';
import {BOOKS_URL} from '../../environments/environment';
import {ChapterService} from './chapter.service';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageEditorService {

  constructor(private chapterService: ChapterService) { }

  private TEMPLATE : string = '<myimg></myimg>';

  public replaceImages(bookId: number, chapterId: number, content: string): Observable<string> {

    const subject: Subject<string> = new Subject<string>();

    this.chapterService.getChapter(bookId, chapterId).subscribe(chapter => {
      for(let img of chapter.images){
        const path: string = `${BOOKS_URL}/${bookId}/chapters/${chapter.id}/images/${img.filename}`;

        const realImageTag: string = `<img src="${path}" alt="${img.filename}"/>`;
        content = content.replace(this.TEMPLATE,realImageTag);

        console.log(realImageTag);
      }
      subject.next(content);
    });

    return subject.asObservable();
  }
}
