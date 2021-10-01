import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../products/product';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss'],
})
export class ReactiveComponent implements OnInit {
  products$: Observable<Product[]> = this.productService.getProducts();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}
}
