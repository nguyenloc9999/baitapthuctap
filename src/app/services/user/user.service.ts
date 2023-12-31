import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  signUp(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:8081/api/signup', user);
  }
  signIn(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:8081/api/signin', user);
  }
  getUser(): Observable<IUser[]> {
    return this.http.get<IUser[]>('http://localhost:8081/api/user');
  }
  getUserById(id: string | number): Observable<IUser> {
    return this.http.get<IUser>(`http://localhost:8081/api/user/${id}`);
  }
  removeUser(id: number): Observable<IUser> {
    return this.http.delete<IUser>(`http://localhost:8081/api/user/${id}`)
  }
  updateUser(user: IUser): Observable<IUser> {
    return this.http.patch<IUser>(`http://localhost:8081/api/user/${user._id}`, user)
  }
}
