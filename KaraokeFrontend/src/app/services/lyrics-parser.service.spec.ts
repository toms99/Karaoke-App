import { TestBed } from '@angular/core/testing';

import { LyricsParserService } from './lyrics-parser.service';

describe('LyricsParserService', () => {
  let service: LyricsParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LyricsParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
