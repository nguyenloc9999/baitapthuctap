import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'
import { trigger, transition, style, animate } from '@angular/animations';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: IProduct[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private productService: ProductService) {
    this.paginator = {} as MatPaginator

  }
  pagination = {
    hasNextPage: true,
    hasPrevPage: false,
    limit: 1,
    nextPage: 1,
    page: 1,
    pagingCounter: 1,
    prevPage: null,
    totalDocs: 1,
    totalPages: 1
  }

  limit = 4

  formattedPagination: any = {}

  ngOnInit() {
    this.getProduct(1);
  }

  pageIndex: any
  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex // Lấy chỉ mục trang mới
    this.limit = event.pageSize // Lấy kích thước trang
    this.getProduct(this.pageIndex + 1) // Lấy dữ liệu cho trang mới
  }
  getProduct(page: number): void {
    this.productService.getAllProducts(this.limit, page).subscribe((res: any) => {
      this.products = res.docs
      this.formattedPagination.length = res.totalDocs
      this.formattedPagination.pageIndex = res.page - 1
      this.formattedPagination.pageSize = res.limit
      this.formattedPagination.pageSizeOptions = [3, 6]
      this.formattedPagination.totalPages = res.totalPages
      this.formattedPagination.page = res.page
      console.log(this.products); // Log products data here
      console.log(this.formattedPagination.pageSizeOptions);
    })
  }
  currentProduct() {
    this.productService.getProducts().subscribe((data: any) => this.products = data.docs

    )
  }
}
