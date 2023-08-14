import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ServiceService } from 'src/app/service/service.service';
import { CartService } from 'src/app/service/cart.service';
import { Cart, CartItem } from 'src/app/models/cart';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id:any
  data:any = {};
  @Input() product: Product | undefined
  @Output() addToCart = new EventEmitter();
  itemsQuantity = 0
  private _cart: Cart={items:[]}

  @Input()
  get cart(): Cart{
    return this._cart
  }

  set cart(cart:Cart){
    this._cart = cart;
    this.itemsQuantity = cart.items
    .map((item)=>item.quantity)
    .reduce((prev, current)=>prev + current, 0)
  }

  constructor(private route:ActivatedRoute,
    private service:ServiceService,
    private cartService:CartService) {
    this.id = this.route.snapshot.paramMap.get("id")

   }

  ngOnInit(): void {
    this.getProducts()

  }

  getProducts() {
    this.service.getProductsById(this.id).subscribe(res => {
      this.data = res
    }, error => {
    alert(error)
    }
    )
  }

  onAddToCart(){
    this.addToCart.emit(this.product);
  }

  getTotal(items: Array<CartItem>): number{
    return this.cartService.getTotal(items)
  }

  onClearCart(){
    this.cartService.ClearCart()
  }

}
