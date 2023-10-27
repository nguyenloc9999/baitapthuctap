import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStatus } from 'src/app/interfaces/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }
  getAllStatus(): Observable<IStatus[]> {
    return this.http.get<IStatus[]>(`http://localhost:8081/api/status`)
  }
}
