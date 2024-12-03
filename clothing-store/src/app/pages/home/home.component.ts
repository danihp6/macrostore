import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products = [
    {
      id: 'test',
      name: 'Blue T-Shirt',
      price: 100,
      src: 'images/blue-t-shirt.webp'
    }
  ];
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
}
