import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private service: CartService, private route: ActivatedRoute) { }
  orders: any[] = [];
  vendorId: string | null = null;

  ngOnInit(): void {
    // Récupérer l'ID du vendeur à partir de l'URL
    this.route.paramMap.subscribe((params) => {
      this.vendorId = params.get('id');
      // Appeler la méthode pour récupérer les commandes pour le vendeur spécifique
      this.getOrders();
    });
  }

  onAddToCart(product: Product) {
    // ... (votre code pour ajouter des produits au panier)
  }

  getOrders() {
    // Assurez-vous que vendorId a une valeur avant de récupérer les commandes
    if (this.vendorId) {
      this.service.getOrdersForVendor(this.vendorId).subscribe(
        (data) => {
          // Stocker les données des commandes dans la propriété 'orders'
          this.orders = data;
        },
        (error) => {
          console.log('Erreur lors de la récupération des commandes', error);
        }
      );
    }
  }
}
