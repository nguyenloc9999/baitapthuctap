import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent {
  cart: any;
  userId: string;
  data: any;
  orderForm: FormGroup;

  constructor(
    private cartService: CartService,
    private router: Router,
    private formBuilder: FormBuilder,
    private orderService: OrderService
  ) {
    this.userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).user._id : '';
    this.data = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : '';

    this.orderForm = this.formBuilder.group({
      userId: [''],
      name: [''],
      address: [''],
      phone: [''],
      notes: ['']
    });
    this.orderForm.patchValue({
      userId: this.data?.user?._id,
      name: this.data?.user?.name,
      address: this.data?.user?.address
    });
  }

  ngOnInit() {
    if (this.userId === '') return;
    this.cartService.getCart(this.userId).subscribe(cart => {
      this.cart = cart;
    });

    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).accessToken : '';
    if (!token) {
      this.router.navigate(['/signin']);
    }
  }

  onHandlePay() {
    if (this.orderForm.valid) {
      const products = this.cart.data.products.map((product: any) => {
        return {
          productId: product.productId,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: product.quantity
        };
      });

      const order = {
        userId: this.orderForm.value.userId || '',
        name: this.orderForm.value.name || '',
        address: this.orderForm.value.address || '',
        phone: this.orderForm.value.phone || '',
        notes: this.orderForm.value.notes || '',
        products: products,
        total: this.cart.data.total
      };
      console.log(order);


      this.orderService.addOrder(order).subscribe(
        (response) => {
          console.log(response);

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đã thêm đơn hàng thành công!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  }
}
