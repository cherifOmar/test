import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';
import { AuthModule } from '../auth/auth.module';
import { ProductsHeaderComponent } from './products-header/products-header.component';
import { FiltersComponent } from './filters/filters.component';
import { ProductBoxComponent } from './product-box/product-box.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';



@NgModule({
  declarations: [
    HomeComponent,
    ProductsHeaderComponent,
    FiltersComponent,
    ProductBoxComponent,
    CartComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    AuthModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
