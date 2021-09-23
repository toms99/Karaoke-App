import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cancion } from '../Clases/Cancion';
import { PlayerService } from '../services/player.service';
import file from '../../assets/songLyrics.json'
import { concat } from 'rxjs';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  public isPlaying = false;
  public isAudioLoaded = false;
  public song: Cancion = new Cancion();
  public lyrics = "hi";
  public nextLyrics = "bye";
  public currentSecs = 0.0;
  public playIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">   <path       d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" /> </svg>';
  audio = new Audio();

  constructor(private router: Router, private player: PlayerService) { }

  ngOnInit() {
    // this.song = this.player.cancion;
    this.song.letra = file.timedLyrics;
    console.log("vacio?", this.song)
    this.loadAudio();
  }

  loadLyrics() {
    // let lyrics = this.song.letra;
    let lyrics = file.timedLyrics;
    this.lyrics = lyrics[0].words;
    this.nextLyrics = lyrics[1].words;
  }

  loadAudio() {
    this.loadLyrics();
    // this.audio.src = this.song.url;
    this.audio.src = '../../assets/videoplayback.m4a';
    this.audio.load();
    setTimeout(() => { this.isAudioLoaded = true }, 1300);
  }

  playAudio() {
    if (!this.isPlaying && this.isAudioLoaded) {
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
    this.refresh();
    console.log("Im complete")
  }



  refresh() {
    let currentPos = this.currentSecs;
    let lyrics = this.song.letra;
    let self = this;
    const interval = setInterval(() => {
      if (self.isPlaying) {
        currentPos = parseFloat(currentPos.toFixed(2));
        self.currentSecs = currentPos;
        lyrics.forEach(song => {
          if (song.second == currentPos && currentPos > 1) {
            this.lyrics = song.words;
            let tmpIndex = lyrics.findIndex(tmpsong => (tmpsong.second == song.second))
            this.nextLyrics = (lyrics[tmpIndex + 1]) ? lyrics[tmpIndex + 1].words : "";
          }
        })
        currentPos += 0.01;
      } else if (this.lyrics === "") {
        clearInterval(interval); this.stopAudio()
      } else {
        clearInterval(interval);
      }

    }, 10);
  }



  CloseWindow() {
    this.router.navigateByUrl("/Usuario");
  }


}
