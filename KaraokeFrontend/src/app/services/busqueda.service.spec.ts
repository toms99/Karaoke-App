import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";


import { BusquedaService } from './busqueda.service';

describe('LyricsParserService', () => {
  let service: BusquedaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusquedaService],
      imports: [ RouterTestingModule, HttpClientTestingModule,  ]

    })
    .compileComponents();
  });

  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusquedaService);
  });



});