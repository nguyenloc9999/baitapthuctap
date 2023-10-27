import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent  implements OnInit {
  detailOrder: any[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(): void {
    this.orderService.getAllOrder().subscribe(
      (response: any[]) => {
        this.detailOrder = response;
        console.log(this.detailOrder);
        
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  huyDon(orderId: string, status: string): void {
    const updatedStatus = '6488a33d098b67f90d85df7a'; // Trạng thái mới là 'cancel'

    Swal.fire({
      title: 'Hủy đơn hàng',
      text: 'Bạn có chắc muốn hủy đơn hàng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.updateOrder({ _id: orderId, status: updatedStatus }).subscribe(
          (response: any) => {
            console.log(response);
            Swal.fire('Thành công', 'Đã hủy đơn hàng', 'success');
            this.getOrderDetails();
          },
          (error: any) => {
            console.log('Error:', error);
            Swal.fire('Lỗi', 'Đã xảy ra lỗi khi hủy đơn hàng', 'error');
          }
        );
      }
    });
  }

}
