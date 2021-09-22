import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponentComponent } from "./login-component.component";;
import { RouterTestingModule } from '@angular/router/testing';

describe('TestComponent', () => {
  let component: LoginComponentComponent;
  let fixture: ComponentFixture<LoginComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponentComponent],
      imports: [ RouterTestingModule ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });



});