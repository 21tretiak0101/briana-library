import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {NgAnimateScrollService} from 'ng-animate-scroll';

import {BookService} from '../services/book.service';
import {Book} from '../interfaces/book';
import {ContentService} from '../services/content.service';
import {ImageEditorService} from '../services/image-editor.service';
import {Content} from '../interfaces/content';

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
  private bookID: number;
  public content: string;
  public contentList: Content[];
  public pageTitle: string;


  constructor(private route: ActivatedRoute,
              private bookService: BookService,
              private chapterService: ContentService,
              private imageEditorService: ImageEditorService,
              private animate: NgAnimateScrollService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getBookById(params.id);
      this.bookID = params.id;
    });
    this.navigateToHeader();
  }

  getBookById(id: number): void {
    this.bookService.getBookInfoById(id).subscribe( book => {
      this.book = book;
      this.contentList = book.content;
      this.getContent(book.content[0]);
    });
  }

  getContent(content: Content): void {
    this.pageTitle = content.title;
    this.chapterService.getBookContent(this.bookID, content.path).subscribe( content => {
      this.content = this.imageEditorService.replaceImages(content, this.bookID);
    })
  }

  navigateToHeader(): void {
    this.animate.scrollToElement('nav-scroll');
  }
}
