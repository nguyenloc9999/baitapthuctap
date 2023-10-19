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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
