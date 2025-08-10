import { TestBed } from '@angular/core/testing';

import { NycShopFormService } from './nyc-shop-form.service';

describe('NycShopFormService', () => {
  let service: NycShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NycShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
