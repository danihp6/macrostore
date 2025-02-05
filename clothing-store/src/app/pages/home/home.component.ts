import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
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
  adds = [
    {
      id: '0',
      src: 'images/asset.jpg'
    },
    {
      id: '1',
      src: 'images/asset2.jpg'
    }
  ];
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    touchDrag: true,
    dots: true,
    center: true,
    margin: 20,
    autoHeight: true,
    autoWidth: true,
    items: 1,
  };
  category = '';

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private shoppingCartService: ShoppingCartService) {
    this.route.params.subscribe(params => {
      this.category = params['category'] === 'all' ? '' : params['category'];
      this.productsService.getProducts('clothing', this.category ? { category: this.category } : {}).subscribe(products => {
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
