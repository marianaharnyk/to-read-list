import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BookService } from '../services/book.service' 
import { Book } from '../models/book.interface';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddBookPopUpComponent} from '../add-book-pop-up/add-book-pop-up.component'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  displayedColumns: string[] = ['checkbox', 'id', 'title', 'pageCount', 'publishDate', 'edit'];
  dataSource = new MatTableDataSource<Book>();
  booksList: Book[];
  unsubscribe: Subject<any> = new Subject();

  constructor(
    private bookService: BookService,
    public dialog: MatDialog
  ) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getAllBooksInfo();
    this.dataSource.sort = this.sort;
  }

  public getAllBooksInfo(): void {
    this.bookService
      .getAllBooksInfo()
      .subscribe((res: Book[]) => {
        this.booksList = res;
        this.dataSource.data = res;
      });
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }

    const data = this.dataSource.data.slice();
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'id':
        this.dataSource.data = data.sort((a: Book, b: Book) => {
          return this.sortNumeric(a.id, b.id, isAsc);
        });
        break;
      case 'title':
        this.dataSource.data = data.sort((a: Book, b: Book) => {
          return isAsc
            ?  this.sortAlphanumeric(a.title, b.title)
            :  this.sortAlphanumeric(b.title, a.title)  
        });
        break;
      case 'pageCount':
        this.dataSource.data = data.sort((a: Book, b: Book) => {
          return this.sortNumeric(a.pageCount, b.pageCount, isAsc);
        });
        break;
      case 'publishDate':
        this.dataSource.data = data.sort((a: Book, b: Book) => {
          return this.sortNumeric(new Date(a.publishDate).getTime(), new Date(b.publishDate).getTime(), isAsc);
        });
        break;
    }
  }

  sortNumeric(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortAlphanumeric(a: string, b: string): number {
    return a.localeCompare(b, 'en', { numeric: true });
  }

  applyFilter(filterValue: string): void{
    this.dataSource.data = this.booksList.filter((it) => it.title.includes(filterValue));
  }

  selectRowsToChange(event: Event): void {
    const row = ((event.target as HTMLElement).parentElement).parentElement;
    row.classList.toggle('selected-book')
  }

  addNewBook(): void {
    this.openDialog(false);
  }

  editBook(bookItem: Book): void{
    this.openDialog(true, bookItem);
  }



  openDialog(isEdit: boolean, book?: Book): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'book-matDialog-styles';
    dialogConfig.data = {
      edit: isEdit,
    };
    if (isEdit) {
      dialogConfig.data.book = book;
    } else {
      dialogConfig.data.book = {};
    }
    this.dialog.open(AddBookPopUpComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
