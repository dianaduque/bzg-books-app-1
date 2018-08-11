import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BookListService } from "../../../books-main/services/list/book-list.service";
import { Store, } from "@ngrx/store";
import * as fromRoot from "../../../reducers";
import * as layout from "../../actions/layout";

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent implements OnInit {

  state:string;

  constructor(private bookService: BookListService, private store: Store<fromRoot.State>) { 
    this.state = 'open';
  }

  ngOnInit() {
  }

  open() {
    if(this.state === 'close')
    {
      this.state = 'open';
      this.store.dispatch(new layout.OpenSideNav());
    }
    else
    {
      this.state = 'close';
      this.store.dispatch(new layout.CloseSideNav());
    }
  }

  searchBooks(text:string) {
    this.bookService.searchBooks(text, 0, 20);
  }

}
