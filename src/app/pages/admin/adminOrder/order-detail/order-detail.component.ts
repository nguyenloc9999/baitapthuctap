import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from 'src/app/interfaces/order';
import { IStatus } from 'src/app/interfaces/status';
import { OrderService } from 'src/app/services/order/order.service';
import { StatusService } from 'src/app/services/status/status.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {
  orders !: IOrder
  orderproduct !:any
  statusList: IStatus[] = []
  order!:any
  orderForm = this.formBuilder.group({
    status: ["",[Validators.required]],
  })
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private statusService: StatusService,
    private router: Router,
    private formBuilder : FormBuilder,
  ) {
    this.route.paramMap.subscribe(params => {
      const id = String(params.get('id'));
      if (id) {
        this.orderService.getOrderId(id).subscribe((order: any) => {
          this.orders = order;
          this.order = order.order || "";
          this.orderproduct = order.products;
          this.orderForm.patchValue({
            status: order.status,
          });
        });
      }
    })
    this.statusService.getAllStatus().subscribe(data => this.statusList = data)
  }
  onHandleSubmit(){
    if(this.orderForm.valid){
      
      const order: IOrder ={    
        _id:this.orders._id,
        status:this.orderForm.value.status || "",
      }
      console.log(order);
      
      this.orderService.updateOrder(order).subscribe(data => {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Category has been added successfully!',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(["/admin/order"])  
      }, error => {
        console.log(error.message);
            
      })
    }}
}
