import { Component } from '@angular/core';
import { Product } from 'macrostore-lib';
import { ProductsService } from 'macrostore-lib';
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

  constructor(private productsService: ProductsService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.category = params['category'] === 'all' ? '' : params['category'];
      this.productsService.getProducts('electronics', this.category ? { category: this.category } : {}).subscribe(products => {
        this.products = products;
      });
    });
  }
}
