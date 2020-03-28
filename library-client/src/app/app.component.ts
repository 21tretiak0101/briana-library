import {Component, OnInit} from '@angular/core';
import {NgAnimateScrollService} from 'ng-animate-scroll';
import {interval} from 'rxjs';
declare var $: any;
const secondsCounter = interval(1000);


import {BookService} from './services/book.service';
import {Book} from './interfaces/book';
import {BookList} from './interfaces/book-list';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public books: Book[] = [];

  constructor(private bookService: BookService,
              private animate: NgAnimateScrollService) { }

  ngOnInit(): void {
    this.addPopoverSupport();
    this.getBookList();
  }

  getBookList(): void {
    this.bookService.getAllBooks().subscribe(bookList => {
      this.putAllBooksFromList(bookList);
    })
  }

  putAllBooksFromList(list: BookList): void {
    for(let id of list.ids) {
      this.bookService.getBookById(id).subscribe(book => {
        this.books.push(book);
      });
    }
  }

  navigateToHeader(): void {
    this.animate.scrollToElement('nav-scroll');
  }

  public addPopoverSupport(): void {
    secondsCounter.subscribe( () => {
      $('[data-toggle="popover"]').popover();
    });
  }

}
