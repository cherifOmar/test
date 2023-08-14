import { Component, Input, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() product: Product | undefined

  cart: Cart = { items: []};
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]

  constructor(private service:CartService) { }

  ngOnInit(): void {
    this.service.cart.subscribe((_cart:Cart)=>{
      this.cart = _cart;
      this.dataSource  = this.cart.items
    })
  }

  getTotal(items: Array<CartItem>): number{
    return this.service.getTotal(items)
  }

  onClearCart(){
    this.service.ClearCart()
  }

  onRemoveFromCart(item:CartItem){
    this.service.removeFromCart(item)
  }

  onAddQuantity(item: CartItem) {
    // I suppose you can get vendorId from the item, adjust this accordingly
    const vendorId = item.vendorId;

    this.service.addToCart(item, vendorId);
  }


  onRemoveQuantity(item: CartItem){
    this.service.removeQuantity(item);
  }



  checkOut() {
    // const productsByVendor: { [key: string]: CartItem[] } = {};

    // // Regrouper les produits par vendeur
    // this.service.getCartItems().forEach((cartItem) => {
    //   const vendorId = cartItem.vendorId;

    //   if (!productsByVendor[vendorId]) {
    //     productsByVendor[vendorId] = [];
    //   }
    //   productsByVendor[vendorId].push(cartItem);
    // });

    // // Passer les commandes pour chaque vendeur
    // for (const vendorId in productsByVendor) {
    //   const productsForVendor = productsByVendor[vendorId];

    //   this.service.checkOutProduct(productsForVendor, vendorId).subscribe(
    //     (result) => {
    //       // Handle result, par exemple, afficher un message de succès
    //       console.log('Commande pour le vendeur ' + vendorId + ' envoyée avec succès.');
    //     },
    //     (error) => {
    //       console.log('Erreur lors de l\'envoi de la commande pour le vendeur ' + vendorId, error);
    //     }
    //   );
    // }

    // // Vider le panier après avoir passé les commandes
    // this.service.ClearCart();
  }


  getPlatImageUrl(images: string): string {
    return `http://localhost:9090/img/${images}`;
  }

}
