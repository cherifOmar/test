export interface Cart {
  items:Array<CartItem>;
}

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  id: number;
  category: string;
  description: string;
  image: string;
  vendorId: string;
}
