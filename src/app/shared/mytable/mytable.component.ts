import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataTableActions } from './table.model';

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

  @Input()
  public actions: DataTableActions[] = [];

  @Output()
  public actionsemitter = new EventEmitter<{}>();


  ngOnInit(): void {
  }

  public onRowActionClicked(actionType: string, data: any) {
    this.actionsemitter.emit({ actionType, data });
  }

}
