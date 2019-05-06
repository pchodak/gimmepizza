import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersListService {

  constructor(
    private http: HttpClient
  ) { }

  getOrders() {
    return this.http.get('/orders');
  }
}
