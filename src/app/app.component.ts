import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  productId: number;
  category: string = '';
  productName: string = '';
  pageNumber: number = 1;
  pageSize: number = 5;
  sortBy: string = 'productName';
  sortOrder: string = 'asc';

  productList: any[] = [];
  totalRecords: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getTotal();
    this.onSearch();
  }

  getTotal() {
    this.http.get("https://projectapi.gerasim.in/api/Products/getTotalProduct").subscribe((res: number) => {
      this.totalRecords = res;
    })
  }

  getPageNumbers() {
    const totalPages = Math.ceil(this.totalRecords / this.pageSize);
    return Array(totalPages).fill(0).map((_, i) => i + 1);
  }

  onPageChange(pageNumber) {
    this.pageNumber = pageNumber;
    this.onSearch();
  }

  getValue() {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  onSearch() {
    let params = new HttpParams()
      .set('pageNumber', this.pageNumber.toString())
      .set('pageSize', this.pageSize.toString())
      .set('sortBy', this.sortBy)
      .set('sortOrder', this.sortOrder)
    if (this.category !== '') {
      params = params.set('productId', this.productId);
    }
    if (this.productId) {
      params = params.set('productName', this.productName);
    }
    if (this.productName !== '') {
      params = params.set('productName', this.productName);
    }
    this.http.get("https://projectapi.gerasim.in/api/Products", { params }).subscribe((result: any) => {
      this.productList = result;
    })
  }

  onSort(fieldName) {
    this.sortBy = fieldName;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.onSearch();
  }
}
