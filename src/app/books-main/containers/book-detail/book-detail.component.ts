import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { BookListService } from "../../services/list/book-list.service";
import { BookList } from "../../models/books";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book: any;
  booksListRel: BookList;
  

  constructor(private route: ActivatedRoute, private booksService: BookListService) { 
    this.book = {};
    
  }

  ngOnInit() {
    let id:string;
    //id = this.route.snapshot.paramMap.get('id');

    this.route.params.subscribe((params: Params) => {
      id = params.id;
      
      this.booksService.getBook(id)
      .subscribe(
        (book: any) => {
          this.book = book;

          this.booksService.searchBooks(this.book.volumeInfo.title,1,3);
          console.log(this.book.volumeInfo.averageRating);

          this.booksService.bookList
          .subscribe(
            (books:BookList) => {
              if(books){
                this.booksListRel = books;
              }        
            }
          );
        }
      )
    });
  }

  addFavorite(){
    this.booksService.addFavorite(this.book);
  }

}
