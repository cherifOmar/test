import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {

  @Input() fullWidthMode = false;
  @Input() product: Product | undefined
  // = {
  //   id: 1,
  //   name: 'banana',
  //   price: 150,
  //   category: 'fruit',
  //   description: 'azertyui',
  //   image: 'https://via.placeholder.com/150'
  // };

  @Output() addToCart = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart(){
    this.addToCart.emit(this.product);
  }

  getPlatImageUrl(images: string): string {
    return `http://localhost:9090/img/${images}`;
  }

}
