import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CartComponent } from './home/cart/cart.component';

import { HomeComponent } from './home/home/home.component';
import { ProductDetailsComponent } from './home/product-details/product-details.component';
import { OrdersComponent } from './product/orders/orders.component';
import { StockComponent } from './product/stock/stock.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

const routes: Routes = [

  {path:'home' , component:HomeComponent},
  {path:'' , redirectTo: 'home', pathMatch:'full'},
 {path:'listproduct/:id' , component:NavbarComponent},
 {path:'login' , component:LoginComponent},
 {path:'cart' , component:CartComponent},
 {path:"details/:id", component:ProductDetailsComponent},
 {path:"orders/:id", component:OrdersComponent},
 {path:"stock", component:StockComponent},









  //  {path:'' , redirectTo:'login',pathMatch:'full'},


  //  {path:'**' , component:NotfoundComponent} //lezem tkoun lekhra

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
