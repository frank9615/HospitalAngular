import { Component, Input, OnInit } from '@angular/core';
import { NavModel } from './nav.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  titlelink: string;

  @Input()
  navlinks: NavModel[] = [];

  constructor() {
    this.title = "";
    this.titlelink = "";
  }

  ngOnInit(): void {
  }

}
