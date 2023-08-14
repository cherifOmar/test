import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { Cart, CartItem } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';
import { ServiceService } from 'src/app/service/service.service';


const ROWS_HEIGHT :{[id:number]: number} = {1:400 , 3:335, 4:350};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private _cart: Cart={items:[]}
  itemsQuantity = 0

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

  cols = 3;
  category: String | undefined;
  rowHeight = ROWS_HEIGHT[this.cols]
  products: Array<Product> |undefined
  // sort:String = 'desc'
  count= '12'
  productsSubscription: Subscription | undefined
  categories:string[]=[];

  constructor(private dialog:MatDialog,
     private service:CartService,
     private allServices:ServiceService
     ) { }

  ngOnInit(): void {
    this.service.cart.subscribe((_cart)=>{
      this.cart = _cart;
    })

    this.getAllProducts();
    this.getCategories();


  }



  openLogin() {
    this.dialog.open(LoginComponent, {
      width:'30%'
    })
  }

  onColumnsCountChange(colsNum: number) {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols]
  }

  onItemsCountChange(newCount: number){
    this.count = newCount.toString();
    this.getAllProducts()
  }

  onShowCategory(newCategory: String){
    this.category =  newCategory
  }




onAddToCart(product: Product) {
  const cartItem: CartItem = {
    name: product.name,
    price: product.price,
    quantity: 1,
    id: product._id,
    category: product.category,
    description: product.description,
    image: product.image,
    vendorId: product.vendorId,
  };

  // I suppose you can get vendorId from the product, adjust this accordingly
  const vendorId = product.vendorId;

  this.service.addToCart(cartItem, vendorId);
}



  getTotal(items: Array<CartItem>): number{
    return this.service.getTotal(items)
  }

  onClearCart(){
    this.service.ClearCart()
  }

  getAllProducts(){
    this.productsSubscription = this.allServices.getAllProducts()
    .subscribe((_products)=>{
      this.products = _products
    })
  }

  ngOnDestroy(){
    if(this.productsSubscription){
      this.productsSubscription.unsubscribe()
    }
  }

  getCategories() {
    this.allServices.getAllCategories().subscribe((res:any) => {
      this.categories = res
    }, error => {
      alert(error)
    } )
  }

  getProductsByCategory(keyword:string) {
    this.allServices.getProductsByCategory(keyword).subscribe((res:any) => {
      this.products = res
    })
  }

  filtercategory(event:any) {
    let value = event.target.value;
    (value == "all") ? this.getAllProducts() : this.getProductsByCategory(value)
  }


}
