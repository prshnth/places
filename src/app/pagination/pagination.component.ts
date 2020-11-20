import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { uniq } from 'lodash';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() totalResults = 0;
  @Output() navigated = new EventEmitter<string>();
  pageNumbers: number[] = [];
  currentPage = 1;
  constructor() {}
  ngOnInit(): void {}

  ngOnChanges(): void {
    for (let i = 1; i <= Math.ceil(this.totalResults / 10); i++) {
      this.pageNumbers.push(i);
      this.pageNumbers = uniq(this.pageNumbers);
    }
  }

  onNavigation(pageNumber: any) {
    this.currentPage = pageNumber;
    this.navigated.emit(pageNumber);
  }
}
