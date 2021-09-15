import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-reproduction-file',
  templateUrl: './reproduction-file.component.html',
  styleUrls: ['./reproduction-file.component.css']
})
export class ReproductionFileComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit(): void {
  }

  public IrAStrem(): void{
    this.router.navigateByUrl('/stream');
  }

}
