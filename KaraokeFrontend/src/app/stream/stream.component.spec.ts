import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PlayerService } from '../services/player.service';

import { StreamComponent } from './stream.component';

describe('StreamComponent', () => {
  let component: StreamComponent;
  let service: PlayerService;
  let router: Router;
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
    service = TestBed.inject(PlayerService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should start playing', () => {
  //   component.stopAudio();
  //   component.playAudio()
  //   expect(component.isPlaying).toBeTruthy();
  //   component.stopAudio();
  // });

  // it('should stop playing', () => {
  //   component.stopAudio();
  //   expect(component.isPlaying).toBeFalsy();
  // });




});
