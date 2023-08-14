import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../models/cart';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new BehaviorSubject<Cart>({items: []});
  constructor(private _snackBar: MatSnackBar, private http: HttpClient) { }

  addToCart(item: CartItem, vendorId: string) {
    const items = [...this.cart.value.items];
    const existingItemIndex = items.findIndex((_item) => _item.id === item.id && _item.vendorId === vendorId);

    if (existingItemIndex !== -1) {
      // Le produit existe déjà dans le panier, augmentons simplement la quantité
      items[existingItemIndex].quantity += 1;
    } else {
      // Le produit n'existe pas dans le panier, ajoutons-le avec l'ID du vendeur
      items.push({ ...item, quantity: 1, vendorId });
    }

    this.cart.next({ items });
    this._snackBar.open('1 item added to cart', 'ok', { duration: 3000 });
    console.log(this.cart.value);
  }



  removeQuantity(item: CartItem){
    let itemForRemoval: CartItem | undefined
   let filteredItems =  this.cart.value.items.map((_item)=>{
      if (_item.id === item.id){
        _item.quantity--
        if(_item.quantity === 0){
          itemForRemoval = _item
        }
      }
      return _item
    });
    if (itemForRemoval){
      filteredItems = this.removeFromCart(itemForRemoval, false)
    }
    this.cart.next({items: filteredItems})
    this._snackBar.open('1 item removed from cart','ok',{duration:3000})
  }

  getTotal(items: Array<CartItem>): number{
    return items.map((item) => item.price * item.quantity)
    .reduce((prev, current) => prev + current, 0)
  }

  ClearCart(){
    this.cart.next({items:[]})
    this._snackBar.open('Cart is clear','ok',{duration:3000})
  }

  removeFromCart(item: CartItem, update = true): Array<CartItem>{
    const filteredItems = this.cart.value.items.filter((_item)=>
    _item.id !== item.id );

    if(update){
      this.cart.next({items : filteredItems})
      this._snackBar.open('1 item removed from cart','ok',{duration:3000});
    }

    return filteredItems

  }
  checkOutProduct(data:any, vendorId:any):Observable<Cart>{
    return this.http.post<Cart>("http://localhost:9090/product/venodrProduct/"+vendorId+"/order",data)
  }

  getOrdersForVendor(vendorId: string): Observable<any> {
    // Remplacez l'URL par l'API appropriée pour récupérer les commandes pour le vendeur spécifique
    const url = `http://localhost:9090/vendor/${vendorId}/orders`;

    return this.http.get<any>(url);
  }

}
