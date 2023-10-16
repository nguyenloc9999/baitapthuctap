import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  addComment(comment: any): Observable<IComment> {
    return this.http.post<any>(`https://node-bookselt.onrender.com/api/comment`, comment)
  }
  removeComment(id: any): Observable<IComment> {
    return this.http.delete<IComment>(`https://node-bookselt.onrender.com/api/comment/${id}`)
  }
  getCommentById(id: any): Observable<IComment> {
    return this.http.get<IComment>(`https://node-bookselt.onrender.com/api/comment/${id}/detail`)
  }
  getCommentByProduct(productId: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(`https://node-bookselt.onrender.com/api/comment/${productId}`)
  }
  updateComment(comment: IComment): Observable<IComment> {
    return this.http.post<IComment>(`https://node-bookselt.onrender.com/api/comment/${comment._id}`, comment)
  }
  getAllComment(): Observable<IComment[]> {
    return this.http.get<IComment[]>(`https://node-bookselt.onrender.com/api/comment`)
  }
}
