import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mytable',
  templateUrl: './mytable.component.html',
  styleUrls: ['./mytable.component.css']
})
export class MytableComponent implements OnInit {

  constructor() { }

  @Input()
  public data: any[] = [];

  @Input()
  public headers: string[] = [];

  @Output()
  public delete = new EventEmitter();

  ngOnInit(): void {
  }

}
