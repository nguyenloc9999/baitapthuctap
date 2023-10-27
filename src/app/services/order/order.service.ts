import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from 'src/app/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private http: HttpClient
  ) { }
  getAllOrder(): Observable<any> {
    return this.http.get<any>('http://localhost:8081/api/order');
  }
  getOrderId(id: string | number): Observable<any> {
    return this.http.get<any>(`http://localhost:8081/api/order/${id}`);
  }
  addOrder(order: IOrder): Observable<any> {
    return this.http.post<any>('http://localhost:8081/api/order', order);
  }
  updateOrder(order: IOrder): Observable<IOrder> {
    return this.http.patch<any>(`http://localhost:8081/api/order/${order._id}`, order)
  }
}
