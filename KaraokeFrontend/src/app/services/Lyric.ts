export class Lyric {
  song: string = "";
  artist: string = "";
  album: string = "";
  length = {mins :0, secs: 0.0 };
  timedLyrics: {second: number, words: string}[] = [];
  completeLyrics = ``;
}