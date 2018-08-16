import { Component, OnInit } from '@angular/core';
import { Message } from "../../models/message";
import { MessagesService } from "../../services/messages.service";

@Component({
  selector: 'app-alert-messages',
  templateUrl: './alert-messages.component.html',
  styleUrls: ['./alert-messages.component.css']
})
export class AlertMessagesComponent implements OnInit {

  message:Message;
  classType: string;

  constructor(private messageService: MessagesService) { }

  ngOnInit() {
    this.messageService.getMessage()
    .subscribe(
      (msg : Message) => {
        this.message = msg;
        switch (this.message.type) {
          case 'success': this.classType = 'alert-success';
          break;
          case 'error': this.classType = 'alert-danger';
          break;                        
          default:
            break;
        }
        setTimeout(() => {this.messageService.disposeMessage()}, 5000);
        
      }
    );
  }

}
