import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { LyricsParserService } from 'src/app/services/lyrics-parser.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor(private router: Router, private parser: LyricsParserService) { }

  ngOnInit(): void {
    this.parser.tomsify();
  }
  public navegation(): void{
    this.router.navigate(['/Usuario']);
  }
}
