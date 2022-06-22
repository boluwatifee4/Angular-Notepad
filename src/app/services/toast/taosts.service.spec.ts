import { TestBed } from '@angular/core/testing';

import { TaostsService } from './taosts.service';

describe('TaostsService', () => {
  let service: TaostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
