import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BookService} from '../services/book.service';
import {Book} from '../interfaces/book';
import {ContentService} from '../services/content.service';
import {ImageEditorService} from '../services/image-editor.service';

@Component({
  selector: 'app-reader-page',
  templateUrl: './reader-page.component.html',
  styleUrls: ['./reader-page.component.scss']
})
export class ReaderPageComponent implements OnInit {

  /**
   * this component displays book
   */

  public book: Book;
  public chapterContent: string;

  constructor(private route: ActivatedRoute,
              private bookService: BookService,
              private chapterService: ContentService,
              private imageEditorService: ImageEditorService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getBookById(params.id);
    })
  }

  getBookById(id: number): void {
    this.bookService.getBookInfoById(id).subscribe( book => {
      this.book = book;
    });
  }

  getChapterContent(chapterId: number): void {
    this.chapterService.getContent(this.book.id, chapterId).subscribe( content => {
      this.imageEditorService.replaceImages(this.book.id, chapterId, content).subscribe(content => {
        this.chapterContent = content;
      })
    })
  }
}
