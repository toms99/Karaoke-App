import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import song from "./summer.json";


@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {
  
  public isPlaying = false;
  public lyrics = "hi";
  public nextLyrics = "bye";
  public playIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">   <path       d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" /> </svg>';
  audio = new Audio();

  constructor(private router: Router){}

  ngOnInit() {
    this.loadAudio();
  }

  loadLyrics() {
    let lyrics = song.Lyrics;
    this.lyrics = lyrics[0].words;
    this.nextLyrics = lyrics[1].words;
  }

  loadAudio() {
    this.loadLyrics();
    this.audio.src = "../../assets/input1.wav";
    this.audio.load();
  }

  playAudio() {
    if (!this.isPlaying) {
      this.audio.play();
      this.isPlaying = true;
      this.Run();

    } else {
      this.audio.pause();
      this.isPlaying = false;
    }

  }

  stopAudio() {
    this.loadLyrics();
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
  }

  async Run() {
    let currentPos = 0;
    let lyrics = song.Lyrics;
    while (this.isPlaying) {
      console.log("Im in")
      lyrics.find(song => {
        if (song.second == currentPos && currentPos >1) {
          this.lyrics = this.nextLyrics;
          this.nextLyrics = song.words;
        }
      })
      currentPos++;
      await this.wait(1000);
    }
    console.log("Im complete")
  }

  wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  CloseWindow() {
    this.router.navigateByUrl("/Usuario");
  }


}
