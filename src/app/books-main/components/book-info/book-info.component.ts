import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CollectionService } from '../../../collections/services/collection.service';
import { AngularFireList } from 'angularfire2/database';
import { Collection, ICollection } from '../../../collections/models/collection';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {

  @Input() book: any;
  @Output() pushFavorite = new EventEmitter<any>();
  listCollections: Observable<any[]>;
  collectionSelected:ICollection;

  constructor(private collectionService:CollectionService, private authFire: AngularFireAuth) { 
    this.listCollections = null;
    this.collectionSelected = null;
  }

  ngOnInit() {    
    this.pushFavorite.emit(this.book);

    this.authFire.authState
    .subscribe(
      user => {          
        this.listCollections =  this.collectionService.getListCollections().snapshotChanges().pipe(
          map(changes => 
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          ));
      }
    );   
  }

  addFavorite() {
    this.pushFavorite.emit(this.book);
  }

  addToCollection(event:any){
    this.collectionService.addBook(event.target.value,this.book);
  }

  getStarsIndicator(averageRating: number): Int16Array {
    let starsIndicator = new Int16Array(5);
    let qoutient = Math.trunc(averageRating) ;
    let remain = averageRating - Math.trunc(averageRating);
    for(let i = 0; i < 5; i++)
    {
      if(!isNaN(qoutient) && i < qoutient)
        starsIndicator[i] = 0;
      else if(!isNaN(remain) && remain > 0){
        starsIndicator[i] = 1;
        remain = 0;
      }
      else
        starsIndicator[i] = 2;
    }

    return starsIndicator;
  }

  getNumberOfVotes(numberOfVotes: number): number{
    if(isNaN(numberOfVotes))
      return 0;
    
    return numberOfVotes;
  }
}
