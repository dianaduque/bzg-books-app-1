import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { CollectionListComponent } from './containers/collection-list/collection-list.component';
import { CollectionFormComponent } from './components/collection-form/collection-form.component';
import { CollectionBooksComponent } from './components/collection-books/collection-books.component';
import { routes } from "./routes.collections";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const COMPONENTS = [
  CollectionListComponent,
  CollectionFormComponent,
  CollectionBooksComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: COMPONENTS
})
export class CollectionsModule { }
