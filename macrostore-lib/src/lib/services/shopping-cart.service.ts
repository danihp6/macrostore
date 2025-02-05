import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private products: Product[] = [];
  private $products = new BehaviorSubject<Product[]>(this.products);

  constructor() {
    const products = localStorage.getItem('products');
    if (products) {
      this.products = JSON.parse(products);
      this.$products.next(this.products);
    }
  }

  add(product: Product) {
    if (this.products.some(i => i.id === product.id)) {
      return;
    }
    this.products.push(product);
    localStorage.setItem('products', JSON.stringify(this.products));
    this.$products.next(this.products);
  }

  remove(product: Product) {
    this.products = this.products.filter(i => i.id !== product.id);
    localStorage.setItem('products', JSON.stringify(this.products));
    this.$products.next(this.products);
  }

  have(product: Product) {
    return this.products.some(i => i.id === product.id);
  }

  get() {
    return this.$products.asObservable();
  }
}
