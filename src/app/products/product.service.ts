import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Product } from './product';

const mockProducts: Product[] = [
  { name: 'Scala for beginners', available: 20, price: 39.95 },
  { name: 'Kotlin for beginners', available: 10, price: 19.95 },
  { name: 'RxJS for beginners', available: 25, price: 49.95 },
  { name: 'Angular for beginners', available: 24, price: 29.95 },
  { name: 'React for beginners', available: 18, price: 59.95 },
];

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProducts(): Observable<Product[]> {
    return of(mockProducts).pipe(delay(1000));
  }
}
