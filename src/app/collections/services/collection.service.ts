import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { MessagesService } from '../../alerts/services/messages.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Collection } from '../models/collection';
import { User } from '../../auth/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  user: firebase.User;

  favsRef: AngularFireList<any> = null;  
  favsRef1: AngularFireList<any> = null;

  constructor(private alertService: MessagesService, private authFire: AngularFireAuth,
    private rdb: AngularFireDatabase) { 
      authFire.authState.subscribe(
        user => {
          this.user = user;
          this.favsRef = rdb.list('collections/' + this.user.uid);
        }
      )
    }

  newCollection(collection:Collection){


      const promise = this.favsRef.push(collection);
      promise.then(() => {
        this.alertService.message({msg:"Collection creada", type:"success"});
      });
    }

  getListCollections(): AngularFireList<any[]>{
    return this.favsRef;
  }

  getBooksInCollection(key:string): AngularFireList<any[]>{
    this.favsRef1 = this.rdb.list<any[]>('collections/' + this.user.uid + "/" + key + "/books");
    return this.favsRef1;
  }

  removeCollection(key: string){
    this.rdb.list<any[]>('collections/' + this.user.uid + "/" + key).remove()
  }

  removeBookFromCollection(key:string, bookId:string){
    this.rdb.list<any[]>('collections/' + this.user.uid + "/" + key + "/books/" + bookId).remove();
  }

  addBook(key:string, book: any){
    let favsRef1 = this.rdb.list('collections/' + this.user.uid + "/" + key + "/books");
    const promise = favsRef1.push(book);
    promise.then(() => {
      this.alertService.message({msg:"libro adicionado a la coleccion", type:"success"});
    });

  }
}
