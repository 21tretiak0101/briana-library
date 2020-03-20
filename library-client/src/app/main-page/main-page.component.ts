import {Component, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {Book} from '../interfaces/book';
import {BookList} from '../interfaces/book-list';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  /**
   * this component displays all books with description
   */

  public books: [Book?] = [];

  constructor(private bookService: BookService) {}

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
        this.books.unshift(book);
      });
    }
  }
}
