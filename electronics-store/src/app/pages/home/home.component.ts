import { Component } from '@angular/core';
import { Product } from 'macrostore-lib';
import { ProductsService, ShoppingCartService } from 'macrostore-lib';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products: Product[] = [];
  menuOpen = false;
  category = '';

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private shoppingCartService: ShoppingCartService) {
    this.route.params.subscribe(params => {
      this.category = params['category'] === 'all' ? '' : params['category'];
      this.productsService.getProducts('electronics', this.category ? { category: this.category } : {}).subscribe(products => {
        this.products = products;
      });
    });
  }

  have(product: Product) {
    return this.shoppingCartService.have(product);
  }

  add(product: Product) {
    if (this.shoppingCartService.have(product)) {
      this.shoppingCartService.remove(product);
    } else {
      this.shoppingCartService.add(product);
    }
  }
}
