import { TestBed } from '@angular/core/testing';

import { ProductorService } from './productor.service';

describe('ProductorService', () => {
  let service: ProductorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
