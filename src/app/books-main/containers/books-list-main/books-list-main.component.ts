import { Component, OnInit } from '@angular/core';
import { BookListService } from "../../services/list/book-list.service";
import { BookList } from "../../models/books";
import { InterpolationConfig } from '@angular/compiler';
import { PagerServiceService } from '../../services/pager-service.service'

@Component({
  selector: 'app-books-list-main',
  templateUrl: './books-list-main.component.html',
  styleUrls: ['./books-list-main.component.css']
})
export class BooksListMainComponent implements OnInit {

  booksList: BookList;
  pager: any = {};
  pagedItems: any[];

  constructor(private booksService: BookListService, private pagerService: PagerServiceService) { 
    this.booksService.searchBooks('Software');
  }

  ngOnInit() {
    this.booksService.bookList
    .subscribe(
      (books:BookList) => {
        if(books){
          this.booksList = books;
          this.setPage(1);
        }        
      }
    );
  }

  
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.booksList.items.length, page);

    // get current page of items
    this.pagedItems = this.booksList.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems);
}

}
