import { Component, OnInit } from '@angular/core';

import { Product } from '../products/product';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-imperative',
  templateUrl: './imperative.component.html',
  styleUrls: ['./imperative.component.scss'],
})
export class ImperativeComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe((products) => (this.products = products));
  }

  search(query: string) {
    // We have just introduced a cool bug! Cause the delay on the service (faked) causes it to respond later and therefore overwriting our products.
    if (query.length > 1) {
      this.productService
        .query(query)
        .subscribe((products) => (this.products = products));
    } else {
      this.productService
        .getProducts()
        .subscribe((products) => (this.products = products));
    }
  }
}
