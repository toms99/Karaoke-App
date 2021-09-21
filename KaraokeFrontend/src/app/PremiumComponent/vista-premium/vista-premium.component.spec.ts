import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { VistaPremiumComponent } from "./vista-premium.component";;

describe('TestComponent', () => {
  let component: VistaPremiumComponent;
  let fixture: ComponentFixture<VistaPremiumComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VistaPremiumComponent],
      imports: [ RouterTestingModule ]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});