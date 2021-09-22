import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ReproductionFileComponent } from "./reproduction-file.component";;

describe('TestComponent', () => {
  let component: ReproductionFileComponent;
  let fixture: ComponentFixture<ReproductionFileComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReproductionFileComponent],
      imports: [ RouterTestingModule ]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReproductionFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render text in a h5 tag', async(() => {
    const fixture = TestBed.createComponent(ReproductionFileComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h5').textContent).toContain('Nombre de la cancion');
  }));

  it('should render text in a h6 tag', async(() => {
    const fixture = TestBed.createComponent(ReproductionFileComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h6').textContent).toContain('Artista');
  }));

  it('should render text in a p tag', async(() => {
    const fixture = TestBed.createComponent(ReproductionFileComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Pedacito de la cancion');
  }));

});