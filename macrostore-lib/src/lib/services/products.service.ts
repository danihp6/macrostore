import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { Product } from '../models/Product';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(department: string) {
    return this.http.get<{products: Product[]}>(`${this.baseUrl}/products/${department}`).pipe(
      map(response => response.products)
    );
  }
}
