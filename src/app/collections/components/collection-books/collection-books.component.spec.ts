import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionBooksComponent } from './collection-books.component';

describe('CollectionBooksComponent', () => {
  let component: CollectionBooksComponent;
  let fixture: ComponentFixture<CollectionBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
