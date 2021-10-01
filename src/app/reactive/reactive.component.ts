import { Component, OnInit } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { filter, mapTo, switchMap } from 'rxjs/operators';

import { Product } from '../products/product';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss'],
})
export class ReactiveComponent implements OnInit {
  private search$$: Subject<string> = new Subject();
  search$: Observable<string> = this.search$$
    .asObservable()
    .pipe(filter((query) => query.length > 1));
  searchEmpty$: Observable<string> = this.search$$.asObservable().pipe(
    filter((query) => query.length === 0),
    mapTo('')
  );
  products$: Observable<Product[]> = merge(
    this.productService.getProducts(),
    this.search$.pipe(switchMap((query) => this.productService.query(query))),
    this.searchEmpty$.pipe(switchMap(() => this.productService.getProducts()))
  );

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  emitSearch(query: string) {
    this.search$$.next(query);
  }
}
