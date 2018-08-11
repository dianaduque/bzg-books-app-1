import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BooksDBService } from "./api-data/api-books-demo";
import { RouterModule } from "@angular/router";
import { AuthModule } from "./auth/auth.module";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { reducers, metaReducer } from "./reducers";

import { AppComponent } from './app.component';
import { routes  } from "./routes";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {metaReducers: metaReducer}),
    StoreDevtoolsModule.instrument(
      {
        name: 'Biz books app',
        logOnly: environment.production,
        maxAge: 30
      }
    ),
    /**
    HttpClientInMemoryWebApiModule.forRoot(
      BooksDBService, {dataEncapsulation: false, delay: 3000}
    ), */
    AuthModule,
    AngularFireModule.initializeApp(environment.firebase, 'bzg-books-app'),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
