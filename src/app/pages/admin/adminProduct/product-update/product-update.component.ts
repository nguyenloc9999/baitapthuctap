import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/interfaces/category';
import { IProduct } from 'src/app/interfaces/product';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UploadService } from 'src/app/services/upload/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent {
  categories: ICategory[] = [];
  product!: IProduct;
  submitted = false;
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    author: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[^0-9]+$')]],
    image: [''],
    price: [0, [Validators.required, Validators.min(1)]],
    description: ['', [Validators.required, Validators.minLength(4)]],
    categoryId: ['', [Validators.required]]
  })

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private uploadService: UploadService
  ) {
    this.route.paramMap.subscribe(params => {
      this.categoryService.getCategories().subscribe(
        (data) => {
          this.categories = data;
        },
        (error) => {
          console.log(error.message);
        }
      );

      const id = String(params.get('id'));
      this.productService.getProductById(id).subscribe(
        (product) => {
          this.product = product;
          this.productForm.patchValue({
            name: this.product.name,
            author: this.product.author,
            price: this.product.price,
            description: this.product.description,
            categoryId: this.product.categoryId
          });

        },
        (error) => {
          console.log(error.message);
        }
      );
    });

    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  selectedImage: any = null; // Biến lưu trữ ảnh được chọn

  onSelectImage(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
      this.productForm.patchValue({ image: this.selectedImage });
    } else {
      this.selectedImage = null;
      this.productForm.patchValue({ image: null });
    }
  }

  onHandleUpdate(): void {
    if (this.productForm.valid) {
      const newProduct: IProduct = {
        _id: this.product._id,
        name: this.productForm.value.name || '',
        author: this.productForm.value.author || '',
        price: this.productForm.value.price || 0,
        image: this.product.image, // Sử dụng ảnh cũ mặc định
        description: this.productForm.value.description || '',
        categoryId: this.productForm.value.categoryId || '',
      };

      if (this.selectedImage) {
        const publicId = this.product.image.publicId;
        console.log(publicId);

        // Tải lên ảnh mới và nhận URL đã tải lên

        this.uploadService.updateImage(publicId, this.selectedImage).subscribe(
          (response) => {

            const imageUrl = response
            console.log(imageUrl);

            if (imageUrl) {
              newProduct.image = imageUrl;

              // Gọi productService.updateProduct() để cập nhật thông tin sản phẩm
              this.productService.updateProduct(newProduct).subscribe(
                (updatedProduct) => {
                  // Xử lý khi sản phẩm được cập nhật thành công
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Product has been updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.router.navigate(['/admin/products']);
                },
                (error) => {
                  // Xử lý khi có lỗi trong quá trình cập nhật sản phẩm
                  console.log(error.message);
                }
              );
            } else {
              // Xử lý khi không có URL mới để cập nhật
              console.log('Không có URL mới để cập nhật');
            }
          },
          (error) => {
            // Xử lý khi có lỗi trong quá trình upload ảnh
            console.log(error.message);
          }
        );
      } else {
        // Người dùng không chọn ảnh mới, chỉ cập nhật thông tin sản phẩm
        this.productService.updateProduct(newProduct).subscribe(
          (updatedProduct) => {
            // Xử lý khi sản phẩm được cập nhật thành công
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Product has been updated successfully!',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/admin/products']);
          },
          (error) => {
            // Xử lý khi có lỗi trong quá trình cập nhật sản phẩm
            console.log(error.message);
          }
        );
      }

    }
  }
}
