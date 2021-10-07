import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ListaCancionesAuxService } from './lista-canciones-aux.service';
import { LyricsParserService } from './lyrics-parser.service';

describe('LyricsParserService', () => {
  let service: ListaCancionesAuxService;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaCancionesAuxService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});