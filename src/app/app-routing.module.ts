import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { SignUpComponent } from './pages/sign/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign/sign-in/sign-in.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProductAddComponent } from './pages/admin/adminProduct/product-add/product-add.component';
import { ProductUpdateComponent } from './pages/admin/adminProduct/product-update/product-update.component';
import { CategoryListComponent } from './pages/admin/adminCategory/category-list/category-list.component';
import { CategoryAddComponent } from './pages/admin/adminCategory/category-add/category-add.component';
import { CategoryUpdateComponent } from './pages/admin/adminCategory/category-update/category-update.component';
import { ProductListComponent } from './pages/admin/adminProduct/product-list/product-list.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: "", component: BaseLayoutComponent, children: [
      { path: "", component: HomeComponent },
      { path: "product/:id", component: ProductDetailComponent },
      { path: "about", component: AboutPageComponent },
      { path: "contact", component: ContactPageComponent },
      { path: "signup", component: SignUpComponent },
      { path: "signin", component: SignInComponent },
      { path: "cart", component: CartComponent },
    ]
  },
  {
    path: "admin", component: AdminLayoutComponent, canActivate: [authGuard], children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent },
      { path: "products", component: ProductListComponent },
      { path: "products/add", component: ProductAddComponent },
      { path: "products/:id/update", component: ProductUpdateComponent },
      { path: "categories", component: CategoryListComponent },
      { path: "categories/add", component: CategoryAddComponent },
      { path: "categories/:id/update", component: CategoryUpdateComponent },
    ]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
