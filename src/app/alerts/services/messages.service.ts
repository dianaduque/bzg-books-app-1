import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { Message } from "../models/message";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private subject = new Subject<any>();

  constructor() { }

  message(msg : Message) {
    this.subject.next(msg);
  }  

  getMessage():Observable<Message> {
    return this.subject.asObservable();
  }

  disposeMessage(){
    this.subject.next();
  }
}
