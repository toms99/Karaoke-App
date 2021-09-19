import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StreamComponent } from './stream.component';

describe('StreamComponent', () => {
  let component: StreamComponent;
  let fixture: ComponentFixture<StreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StreamComponent],
      imports: [ RouterTestingModule ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should start playing', () => {
    component.stopAudio();
    component.playAudio()
    expect(component.isPlaying).toBeTruthy();
    component.stopAudio();
  });

  it('should stop playing', () => {
    component.stopAudio();
    expect(component.isPlaying).toBeFalsy();
  });




});
