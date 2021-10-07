import { Injectable } from '@angular/core';
import { resourceLimits } from 'worker_threads';
import { Cancion } from '../Clases/Cancion';
import { Lyric } from './Lyric';

@Injectable({
  providedIn: 'root'
})


export class LyricsParserService {


  public lyrics = ``

  constructor() { }

  /**
   * Converts one LRC file to JSON ready to send to the API
   * @returns 
   */
  tomsify() {
    let result = new Cancion();
    let lines = this.lyrics.split("\n");

    lines.forEach(line => {
      result = this.selectMainData(line, result);
    })
    
    result = this.finalTouches(result);
    console.log(result);

    return result;
  }

/**
 * 
 * @param line 
 * @param result 
 * @returns 
 */
  selectMainData(line: string, result: Cancion) {
    let originalLine = line;
    line = line.replace('[', '');
    line = line.replace(']', '');
    let tmp = line.split(':');
    if (tmp[0] == "ar") {
      result.artista = tmp[1];
    } else if (tmp[0] == "al") {
      result.album = tmp[1]
    } else if (tmp[0] == "ti") {
      result.nombre = tmp[1]
    } else { result = this.splitLyrics(originalLine, result) }
    return result;
  }


  splitLyrics(line: string, result: Cancion) {
    line = line.replace('[', "");
    let tmp = line.split("]");
    let regexpNumber = new RegExp('^[+0-9]{2}:[+0-9]{2}[.][+0-9]{2}$');
    if (regexpNumber.test(tmp[0])) {
      let tmpTime = tmp[0].split(':');
      let secsPos: number = parseFloat((parseInt(tmpTime[0]) * 60 + parseFloat(tmpTime[1])).toFixed(2));
      result.letra.push({ "second": secsPos, "words": tmp[1] });
    };
    
    return result;
  }

  finalTouches(result: Cancion) {
    let tmpCont = result.letra.length;
    result.letra.push({ "second": result.letra[tmpCont-1].second + 1, "words": "" })
    return result;
  }
}
