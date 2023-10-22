import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthInterceptor } from './auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './components/banner/banner.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { SignUpComponent } from './pages/sign/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign/sign-in/sign-in.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { ProductAddComponent } from './pages/admin/adminProduct/product-add/product-add.component';
import { ProductUpdateComponent } from './pages/admin/adminProduct/product-update/product-update.component';
import { CategoryAddComponent } from './pages/admin/adminCategory/category-add/category-add.component';
import { CategoryUpdateComponent } from './pages/admin/adminCategory/category-update/category-update.component';
import { CategoryListComponent } from './pages/admin/adminCategory/category-list/category-list.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProductListComponent } from './pages/admin/adminProduct/product-list/product-list.component';
import { ProductViewComponent } from './components/product-view/product-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductDetailComponent,
    BannerComponent,
    BaseLayoutComponent,
    ContactPageComponent,
    CategoriesComponent,
    AboutPageComponent,
    SignUpComponent,
    SignInComponent,
    CartComponent,
    ProductAddComponent,
    ProductListComponent,
    ProductUpdateComponent,
    CategoryAddComponent,
    CategoryUpdateComponent,
    CategoryListComponent,
    DashboardComponent,
    AdminLayoutComponent,
    ProductViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatDialogModule,
    MatPaginatorModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
