import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cancion } from '../Clases/Cancion';
import { PlayerService } from '../services/player.service';


@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  public isPlaying = false;
  public song: Cancion = new Cancion();
  public lyrics = "hi";
  public nextLyrics = "bye";
  public currentSecs = 0.0;
  public playIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">   <path       d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" /> </svg>';
  audio = new Audio();

  constructor(private router: Router, private player: PlayerService) { }

  ngOnInit() {
    console.log("vacio?", this.player.cancion)
    this.song = this.player.cancion;
    this.loadAudio();
  }

  loadLyrics() {
    let lyrics = this.song.letra;
    this.lyrics = lyrics[0].words;
    this.nextLyrics = lyrics[1].words;
  }

  loadAudio() {
    this.loadLyrics();
    this.audio.src = this.song.url;
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
    this.refresh();
    console.log("Im complete")
  }



  refresh() {
    let currentPos = 0.0;
    let lyrics = this.song.letra;
    let self = this;
    const interval = setInterval(() => {
      currentPos = parseFloat(currentPos.toFixed(2));
      self.currentSecs = currentPos;
      console.log(currentPos);

      console.log("Im in")
      lyrics.forEach(song => {
        if (song.second == currentPos && currentPos > 1) {
          this.lyrics = song.words;  
          let tmpIndex = lyrics.findIndex(tmpsong => (tmpsong.second == song.second))
          this.nextLyrics = (lyrics[tmpIndex+1]) ? lyrics[tmpIndex+1].words : "";
          // this.lyrics = song.words;
        } 
      })
      currentPos += 0.01;
      if (this.lyrics === ""){clearInterval(interval); this.stopAudio()}
    }, 10);
  }



  CloseWindow() {
    this.router.navigateByUrl("/Usuario");
  }


}
