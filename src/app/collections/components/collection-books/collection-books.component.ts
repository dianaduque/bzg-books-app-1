import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import {CollectionService} from '../../services/collection.service';
import { Observable } from '../../../../../node_modules/rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { AngularFireList } from '../../../../../node_modules/angularfire2/database';

@Component({
  selector: 'app-collection-books',
  templateUrl: './collection-books.component.html',
  styleUrls: ['./collection-books.component.css']
})
export class CollectionBooksComponent implements OnInit {
  books: Observable<any[]>;
  id: string;

  constructor(private route: ActivatedRoute, private collectionService:CollectionService, private authFire: AngularFireAuth) { 
    this.books = null;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    this.authFire.authState
    .subscribe(
      user => {          
        this.books =  this.collectionService.getBooksInCollection(this.id).snapshotChanges().pipe(
          map(changes => 
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          ));
        console.log(this.books);
      }
    ); 
  };

  removeBook(key: string){
    this.collectionService.removeBookFromCollection(this.id, key);
  };
}