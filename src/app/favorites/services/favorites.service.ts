import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as firebase from "firebase";
import { MessagesService } from "../../alerts/services/messages.service";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favsRef: AngularFireList<any> = null;  

  constructor(private alertService: MessagesService, private authFire: AngularFireAuth,
    private rdb: AngularFireDatabase) {    
  }

  listFavorites(user : firebase.User) : AngularFireList<any[]>{
    return this.favsRef = this.rdb.list('favorites/' + user.uid);;
  }

  removeFavorites(user : firebase.User,key: string){
    this.rdb.list<any[]>('favorites/' + user.uid + "/" + key).remove()
  }

}
