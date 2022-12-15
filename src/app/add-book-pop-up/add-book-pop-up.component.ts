import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../models/book.interface';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-book-pop-up',
  templateUrl: './add-book-pop-up.component.html',
  styleUrls: ['./add-book-pop-up.component.css']
})
export class AddBookPopUpComponent implements OnInit {
  addBookForm: FormGroup;
  datePipe = new DatePipe('en');
  editedPublishDate;
  unsubscribe: Subject<any> = new Subject();
  
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddBookPopUpComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      edit: boolean;
      book: Book;
    },
  ) { }

  get title() {
    return this.addBookForm.get('title');
  }
  get description() {
    return this.addBookForm.get('description');
  }
  get excerpt() {
    return this.addBookForm.get('excerpt');
  }
  get pageCount() {
    return this.addBookForm.get('pageCount');
  }
  get publishDate() {
    return this.addBookForm.get('publishDate');
  }

  ngOnInit(): void {
    if (this.data.edit) {
      this.editedPublishDate = this.datePipe.transform(new Date(this.data.book.publishDate), 'dd.MM.yyyy');
    }
    this.addBookForm = this.fb.group({
      title: [this.data.edit ? this.data.book.title : null, Validators.required],
      description: [this.data.edit ? this.data.book.description : null, Validators.required],
      excerpt: [this.data.edit ? this.data.book.excerpt : null, Validators.required],
      pageCount: [this.data.edit ? this.data.book.pageCount : null, Validators.required],
      publishDate: [this.data.edit ? this.editedPublishDate : null, Validators.required],
      id: [this.data.edit ? this.data.book.id : 0],
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  addNewBook(): void {
    const bookItem = {
      id: 0,
      title: this.title.value,
      description: this.description.value,
      excerpt: this.excerpt.value,
      pageCount: this.pageCount.value,
      publishDate: this.publishDate.value
    }

    // Here should be method of service for adding new book 

    this.dialogRef.close();
  }

  saveChanges(): void {
    const bookItem = {
      id: this.data.book.id,
      title: this.title.value,
      description: this.description.value,
      excerpt: this.excerpt.value,
      pageCount: this.pageCount.value,
      publishDate: this.publishDate.value
    }

    // Here should be method of service for updating book 

    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
