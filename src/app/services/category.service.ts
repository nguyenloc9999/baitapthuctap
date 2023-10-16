import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {

  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('https://node-bookselt.onrender.com/api/categories');
  }
  getCategoryById(id: string | number): Observable<ICategory> {
    return this.http.get<ICategory>(`https://node-bookselt.onrender.com/api/categories/${id}`);
  }
  addCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>('https://node-bookselt.onrender.com/api/categories', category);
  }
  updateCategory(category: ICategory): Observable<ICategory> {
    return this.http.patch<ICategory>(`https://node-bookselt.onrender.com/api/categories/${category._id}`, category)
  }
  removeCategory(id: number): Observable<ICategory> {
    return this.http.delete<ICategory>(`https://node-bookselt.onrender.com/api/categories/${id}`)
  }
}
