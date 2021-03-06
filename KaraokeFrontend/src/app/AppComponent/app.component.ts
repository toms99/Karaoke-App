import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Singing for fun!';

  constructor(private titleService: Title) {
    titleService.setTitle(this.title);
  }
}
