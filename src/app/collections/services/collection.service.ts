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

  constructor(private alertService: MessagesService, private authFire: AngularFireAuth,
    private rdb: AngularFireDatabase) { 
      authFire.authState.subscribe(
        user => {
          this.user = user;
          this.favsRef = rdb.list('collections/' + this.user.uid);
          console.log('dentro: '+this.favsRef);
        }
      )
    }

  newCollection(collection:Collection) : AngularFireList<any[]>{


      const promise = this.favsRef.push(collection);
      promise.then(() => {
        this.alertService.message({msg:"Collection creada", type:"success"});
      });

      return null;
    }

  getListCollections(): AngularFireList<any[]>{
    return this.favsRef;
  }
}
