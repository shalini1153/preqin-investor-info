import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { InvestorService } from './investor.service';

describe('InvestorService', () => {
  let service: InvestorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [InvestorService],
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
