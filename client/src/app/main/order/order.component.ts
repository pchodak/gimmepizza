import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from './order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrderService]
})
export class OrderComponent implements OnInit {
  @ViewChild('cchart') cchart;
  public order;
  private orderId = (this.activatedRoute.params as any)._value.id;
  color = 'black';
  pieChartData =  {
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['', 1],
      ['', 1],
      ['', 1],
      ['', 1],
      ['', 1],
      ['', 1],
      ['', 1],
      ['', 1],
    ],
    options: {title: 'Countries', allowHtml: true,
    legend: 'none',
    pieSliceText: 'none',
    tooltip: { trigger: 'none' },
    width: 214,
    height: 214,
    chartArea: {
      width: 200,
      height: 200
    },
    slices: [
      {color: 'black', blocked: true},
      {color: 'black', blocked: true},
      {color: this.color, blocked: true},
      {color: 'black', blocked: false},
      {color: 'black', blocked: false},
      {color: 'black', blocked: false},
      {color: 'black', blocked: false},
      {color: 'black', blocked: false},
    ]
  }
  };
  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.orderService.getOrder(this.orderId).subscribe(res => this.order = res);
  }

  select($event) {
    this._toggleColor($event);
  }

  _toggleColor($event) {
    const googleChartWrapper = this.cchart.wrapper;
    const slice = googleChartWrapper.m.slices[$event.row];
    if (slice && slice.color === 'red') {
      if (slice.blocked) {
        return false;
      } else {
        googleChartWrapper.m.slices[$event.row].color = 'black';
      }
    } else if (slice) {
      googleChartWrapper.m.slices[$event.row].color = 'red';
    }
    this.cchart.redraw();
  }


}
