import { Component, Input } from '@angular/core'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ICart } from 'src/app/interfaces/cart';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';
import { CartService } from 'src/app/services/cart/cart.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cart !: ICart
  productsInCart: IProduct[] = []
  cartItemCount: number = 0;
  searchValue = '';
  products: IProduct[] = [];
  @Input() searchResults: IProduct[] = [];
  showLogoutDropdown: boolean = false;


  constructor(
    private productService: ProductService,
    private router: Router,
    private CartService: CartService,
    private dialog: MatDialog,

  ) { }
  
  userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).user?._id : ''


  openDialog(type: 'signin' | 'signup') {
    if (type === 'signup') {
      this.router.navigate(['/signup'])
    }
    if (type === 'signin') {
      this.router.navigate(['/signin'])
    }
  }
  // 
  getUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('user')!)
    return userInfo
  }
  handleLogout() {
    const logout = localStorage.removeItem('user');
    return logout
  }
  getProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data.docs;
    });
  }

  ngOnInit() {
    this.getProducts();
    if (this.userId === '') return;
    this.CartService.getCart(this.userId).subscribe(cart => {
      this.cart = cart;
      if (this.cart && this.cart.data) {
        this.productsInCart = this.cart.data.products;
        this.cartItemCount = this.productsInCart?.length ??0; // Thêm dòng này để cập nhật cartItemCount
      }
    });
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).accessToken : '';
  }
  onSearch() {
    if (!this.searchValue.trim()) {
      this.searchResults = [];
      return;
    }
    this.productService.searchProducts(this.searchValue).subscribe((data: any) => {
      this.searchResults = data.docs;
      console.log(this.searchResults);

    });
  }
  onSearchBlur() {
    if (!this.searchValue.trim()) {
      this.searchResults = [];
    }
  }
}
