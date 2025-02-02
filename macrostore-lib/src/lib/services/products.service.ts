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

  getProducts(department: string, filter: { [key: string]: any } = {}) {
    const query = Object.entries(filter).map(([key, value]) => `${key}=${value}`).join('&');
    return this.http.get<{products: Product[]}>(`${this.baseUrl}/products/${department}?${query}`).pipe(
      map(response => response.products)
    );
  }
}
