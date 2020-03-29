import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NgAnimateScrollService} from 'ng-animate-scroll';
import {Title} from '@angular/platform-browser';

import {BookService} from '../services/book.service';
import {Book} from '../interfaces/book';
import {ContentService} from '../services/content.service';
import {ImageEditorService} from '../services/image-editor.service';
import {Content} from '../interfaces/content';
import {PageViewer} from '../services/page-viewer';

@Component({
  selector: 'app-reader-page',
  templateUrl: './reader-page.component.html',
  styleUrls: ['./reader-page.component.scss']
})
export class ReaderPageComponent implements OnInit {

  public book: Book;
  public path: string = '';
  public bookId: number;
  public content: string = '';
  public contentList: Content[];
  public next: string;
  public previous: string;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private bookService: BookService,
              private chapterService: ContentService,
              private imageEditorService: ImageEditorService,
              private animate: NgAnimateScrollService,
              private pageViewerService: PageViewer,
              private titleService: Title ) { }

  ngOnInit(): void {
    this.initializeBook();
  }

  private initializeBook(): void {
    this.route.params.subscribe((params: Params) => {
      this.bookId = params.id;
      this.getBookById(this.bookId);
      if(params.path) this.path = params.path;
    });
  }

  private getBookById(id: number): void {
    this.bookService.getBookById(id).subscribe(book => {
      this.book = book;
      this.contentList = book.content;
      this.path = this.path ? this.path : book.content[0].path;
      this.setNextAndPreviousLinks(this.path);
      this.getContent(this.path);
    });
  }

  private getContent(path: string): void {
    this.chapterService.getBookContent(this.bookId, path).subscribe(content => {
      this.content = this.imageEditorService.replaceImages(content, this.bookId);
      this.setTitle();
      this.navigateToHeader();
    });
  }

  navigateToHeader(): void {
    this.animate.scrollToElement('nav-scroll');
  }

  setNextAndPreviousLinks(path: string): void {
    this.next = this.pageViewerService.getPreviousLink(this.contentList, path);
    this.previous = this.pageViewerService.getNextLink(this.contentList, path)
  }

  public setTitle() {
    const newTitle = this.pageViewerService.getPageTitleByPath(this.path);
    this.titleService.setTitle( newTitle );
  }
}

