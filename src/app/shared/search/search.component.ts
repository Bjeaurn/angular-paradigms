import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() query: EventEmitter<string> = new EventEmitter();
  @Input() startQuery?: string;
  constructor() {}

  ngOnInit(): void {}

  emitQuery(value: string) {
    this.query.emit(value);
  }
}
