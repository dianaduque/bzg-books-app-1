import { Routes } from "@angular/router";
import { BooksListMainComponent } from "./containers/books-list-main";
import { BookDetailComponent } from "./containers/book-detail";

export const routes: Routes = [
    {
        path: 'list',
        component: BooksListMainComponent
    },
    {
        path: 'detail/:id',
        component: BookDetailComponent
    },
    {
        path: '', redirectTo: 'list', pathMatch: 'full'
    }
];