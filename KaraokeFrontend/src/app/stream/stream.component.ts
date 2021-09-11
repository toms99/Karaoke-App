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
  audio = new Audio();

  constructor(private router: Router){}

  ngOnInit() {
    let lyrics = song.Lyrics;
    this.lyrics = lyrics[0].words;
    this.nextLyrics = lyrics[1].words;
  }

  playAudio() {
    if (!this.isPlaying) {
      this.audio.src = "../../assets/input1.wav";
      this.audio.load();
      this.audio.play();
      this.isPlaying = true;
      this.Run();

    } else {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
    }

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
