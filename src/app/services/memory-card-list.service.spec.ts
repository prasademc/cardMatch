import { TestBed } from '@angular/core/testing';

import { MemoryCardListService } from './memory-card-list.service';

describe('MemoryCardListService', () => {
  let service: MemoryCardListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemoryCardListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
