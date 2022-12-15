import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookPopUpComponent } from './add-book-pop-up.component';

describe('AddBookPopUpComponent', () => {
  let component: AddBookPopUpComponent;
  let fixture: ComponentFixture<AddBookPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBookPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
