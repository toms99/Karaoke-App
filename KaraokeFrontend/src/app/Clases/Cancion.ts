// tslint:disable-next-line:class-name
export class Cancion{
  _id: string = '';
  nombre: string = '';
  letra: {words:string, second:number}[] = [];
  artista: string = '';
  album: string = '';
  owner: string = '';
  url: string = '';
  filename: string = '';
}
