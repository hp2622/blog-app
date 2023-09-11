import { TestBed } from '@angular/core/testing';

import { BlogCardService } from './blog-card.service';

describe('BlogCardService', () => {
  let service: BlogCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
