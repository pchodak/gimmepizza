import { TestBed, inject } from '@angular/core/testing';

import { OrdersListService } from './orders-list.service';

describe('OrdersListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdersListService]
    });
  });

  it('should be created', inject([OrdersListService], (service: OrdersListService) => {
    expect(service).toBeTruthy();
  }));
});
