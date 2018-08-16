import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, Subject } from 'rxjs';
import { catchError } from "rxjs/operators";
import { MessagesService } from "../../../alerts/services/messages.service";
import { environment } from "../../../../environments/environment";
import { BookList } from "../../models/books";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class BookListService {

  url = environment.apiBooks;
  bookList: Subject<BookList> = new Subject();
  favsRef: AngularFireList<any>;
  user: firebase.User;

  constructor(private http: HttpClient, private alertService: MessagesService,
    private authFire: AngularFireAuth, private rdb: AngularFireDatabase) {
    this.bookList.next({ kind: "", totalItems: 0, items: [] });
    authFire.authState.subscribe(
      user => {
        this.user = user;
        this.favsRef = rdb.list('favorites/' + this.user.uid);
      }
    )
  }

  searchBooks(text: string, startIndex?: number, maxResults?: number) {
    let url = this.url + `volumes?q=${text}`;
    if (startIndex) {
      url += `&startIndex=${startIndex}`;
    }
    if (maxResults) {
      url += `&maxResults=${maxResults}`;
    }
    this.http.get<BookList>(url)
      .pipe(
        catchError(this.handleError<BookList>('Obtener lista de libros', null))
      )
      .subscribe(
        books => {
          this.bookList.next(books);
        }
      );
  }

  getBook(id: string): Observable<any> {
    let url = this.url + `volumes/${id}`;
    return this.http.get(url)
      .pipe(
        catchError(this.handleError('Get Book by ID', null))
      )
  }

  addFavorite(book : any) {
    const promise = this.favsRef.push(book);
    promise.then(() => {
      this.alertService.message({msg:"Libro agregado a favoritos", type:"success"});
    });
  }

  private handleError<T>(operation = 'operation', results?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.messages(`${operation} ha fallado: ${error.message}`);
      return of(results as T);

    }
  }

  private messages(msg: string) {
    let type = "error";
    this.alertService.message({ msg: msg, type: type });
  }
}
