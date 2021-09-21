import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NavComponent } from "./nav.component";;

describe('TestComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [ RouterTestingModule ]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it("should  be boolean", () => {
    if (component.premium) {
      expect(component.premium).toBeTruthy();
    } else {
      expect(component.premium).toBeFalsy();
    }

  })

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});