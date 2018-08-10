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

  

  favsRef: AngularFireList<any> = null;  

  constructor(private alertService: MessagesService, private authFire: AngularFireAuth,
    private rdb: AngularFireDatabase) { }

    newCollection(collection:Collection, user:User) : AngularFireList<any[]>{
      //return this.favsRef = this.rdb.list('collections/' + user.uid + '/' + name);
      
      return null;
    }
}
