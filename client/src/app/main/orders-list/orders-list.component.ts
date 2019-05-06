import { Component, OnInit } from '@angular/core';
import { OrdersListService } from './orders-list.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  providers: [OrdersListService]
})
export class OrdersListComponent implements OnInit {
  public ordersList;
  constructor(
    private orders: OrdersListService
  ) { }

  ngOnInit() {
    this.ordersList = this.orders.getOrders();
  }

}
