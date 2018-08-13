import { Component, OnInit, Input } from '@angular/core';
import { FavoritesService } from "../../services/favorites.service";
@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.css']
})
export class CardBookComponent implements OnInit {

  @Input() book : any;
  @Input() user: firebase.User;
  
  constructor(private favService: FavoritesService) { }

  ngOnInit() {
  }

  removeBook(key: string){    
    this.favService.removeFavorites(this.user, key);
  };
}
