import { Component } from '@angular/core';
import { IOrder } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  orders : IOrder[] = [];
  constructor( private orderService: OrderService){
    this.orderService.getAllOrder().subscribe((data:any) =>{
      this.orders = data
    }, error =>{
      console.log(error.message);
      
    })
  }
}
