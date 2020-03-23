import {Component, OnInit} from '@angular/core';
import {BookService} from './services/book.service';
import {Book} from './interfaces/book';
import {BookList} from './interfaces/book-list';
import {NgAnimateScrollService} from 'ng-animate-scroll';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  /**
   * this component displays all books with description
   */

  public books: Book[] = [];

  constructor(private bookService: BookService,
              private animate: NgAnimateScrollService) { }

  ngOnInit(): void {
    this.getBookList();
  }

  getBookList(): void {
    this.bookService.getAllBooks().subscribe(bookList => {
      this.putAllBooksFromList(bookList);
      console.log('bookList:', bookList);
    })
  }

  putAllBooksFromList(list: BookList): void {
    for(let id of list.ids) {
      this.bookService.getBookInfoById(id).subscribe( book => {
        this.books.push(book);
      });
    }
  }

  navigateToHeader(): void {
    this.animate.scrollToElement('nav-scroll');
  }
}
