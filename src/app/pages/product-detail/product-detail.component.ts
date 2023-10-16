import { Component, ElementRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';


import { FormBuilder, Validators } from '@angular/forms';
import { IProduct } from 'src/app/interfaces/product';
import { IComment } from 'src/app/interfaces/comment';
import { ICategory } from 'src/app/interfaces/category';
import { CartService } from 'src/app/services/cart/cart.service';
import { CommentService } from 'src/app/services/comment/comment.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  quantity: number = 1;
  countCMT: any
  product !: IProduct;
  comment !: IComment[];
  products: IProduct[] = [];
  categories: ICategory[] = [];
  formData: { description: string, userId: string | any, productId: string } = { description: '', userId: '', productId: '' };
  commentForm = this.FormBuilder.group({
    userId: [''], // Truyền giá trị của userId từ instance của IProduct
    productId: [''], // Truyền giá trị của productId từ instance của IProduct
    description: ['']
  })
  userCart = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {}
  constructor(
    private CartService: CartService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private CommentService: CommentService,
    private FormBuilder: FormBuilder,
    private elementRef: ElementRef
  ) {
    this.route.paramMap.subscribe(params => {
      const id = String(params.get('id'));
      this.productService.getProductById(id).subscribe(product => {
        this.product = product;
        this.scrollToTop()

        // set idProduct in formData
        this.formData.productId = id;
      }, error => console.log(error.message)
      )
      // -------------------------
      this.CommentService.getCommentByProduct(id).subscribe((comment: any) => {
        this.comment = comment.comments;
        this.countCMT = this.comment.length

      })
      // -------------------------
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const { user: { _id } } = JSON.parse(storedUser);
        const idUser = _id;
        // set idUser in formData
        this.formData.userId = idUser;
      }
      this.commentForm.patchValue({
        userId: this.formData.userId,
        productId: id
      });
    });
    // ----------------------------------
    this.productService.getProducts().subscribe((products: any) => {
      this.products = products.docs.filter((product: IProduct) => product.categoryId === this.product.categoryId);
    })
  }
  // ----------------------------
  scrollToTop() {
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  // -------------------------------
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  increaseQuantity() {
    this.quantity++;
  }
  //--------------------------------

  onHandleAddComment() {
    if (this.commentForm.valid) {
      const formValue = this.commentForm.value;
      this.CommentService.addComment(formValue).subscribe((data: IComment) => {
        console.log("Thêm bình luận thành công");
        this.route.paramMap.subscribe(params => {
          const id = String(params.get('id'));
          this.CommentService.getCommentByProduct(id).subscribe((comment: any) => {
            this.comment = comment.comments;
            this.countCMT = this.comment.length
          })
        });
      })
    }

  }

  onHandleRemove(id: string | any) {
    // Thực hiện xoá bình luận
    this.CommentService.removeComment(id).subscribe(comment => {
      const newComment = this.comment.filter((cm) => cm._id != id);
      this.comment = newComment;
    });
  }
  // ---------------------------------


  handleAddToCart() {
    if (!this.userCart.user) {
      // Hiển thị thông báo hoặc chuyển hướng đến trang đăng nhập
      console.log("Bạn chưa đăng nhập. Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      this.router.navigate(['/signin']);
      return;
    }

    const data: any = {
      productId: this.product._id,
      name: this.product.name,
      price: this.product.price,
      image: this.product.image?.url,
      quantity: this.quantity,
    }
    console.log(data);

    this.CartService.addToCart(data, this.userCart.user._id).subscribe(cart => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đã thêm sản phẩm vào giỏ hàng!',
        showConfirmButton: false,
        timer: 1500
      })
    })

  }
}
