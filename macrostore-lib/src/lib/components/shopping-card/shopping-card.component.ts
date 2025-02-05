import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { Product } from '../../models/Product';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'lib-shopping-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatBadgeModule],
  templateUrl: './shopping-card.component.html',
  styleUrl: './shopping-card.component.scss',
})
export class ShoppingCardComponent {
  products: Product[] = [];
  opened = false;

  constructor(private shoppingCartService: ShoppingCartService) {
    shoppingCartService.get().subscribe({
      next: products => {
        this.products = products;
      }
    });
  }

  total() {
    return this.products.reduce((acc, item) => acc + item.price, 0);
  }

  deleteProduct(item: Product) {
    this.shoppingCartService.remove(item);
  }
}
