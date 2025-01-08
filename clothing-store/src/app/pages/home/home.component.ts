import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from 'macrostore-lib';
import { ProductsService } from 'macrostore-lib';

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

  constructor(private productsService: ProductsService) {
    this.productsService.getProducts('clothing').subscribe(products => {
      this.products = products;
    });
  }
}
