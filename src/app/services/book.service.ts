import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAllBooksInfo(): Observable<Book[]>  {
    return this.http.get<Book[]>(`https://fakerestapi.azurewebsites.net/api/v1/Books`);
  }
}
