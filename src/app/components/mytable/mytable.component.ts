import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mytable',
  templateUrl: './mytable.component.html',
  styleUrls: ['./mytable.component.css']
})
export class MytableComponent implements OnInit {

  constructor() { }

  @Input()
  data: any[] = [];

  @Input()
  headers: string[] = [];

  ngOnInit(): void {
  }

}
