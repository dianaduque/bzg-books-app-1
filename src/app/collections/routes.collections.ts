import { Routes } from "@angular/router";
import { CollectionListComponent } from "./containers/collection-list/collection-list.component";
import { CollectionBooksComponent } from "./components/collection-books/collection-books.component";

export const routes: Routes = [
    {
        path: 'list',
        component: CollectionListComponent
    },
    {
        path: 'collectionBooks/:id',
        component: CollectionBooksComponent
    },
    {
        path: '', redirectTo: 'list', pathMatch: 'full'
    }
];