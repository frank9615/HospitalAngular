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
  public delete = new EventEmitter<string>();

  @Output()
  public edit = new EventEmitter<string>();

  @Output()
  public addItem = new EventEmitter<string>();

  ngOnInit(): void {
  }


  addNewItem(value: string): void {
    this.addItem.emit(value);
  }

  onDelete(value: string): void {
    this.delete.emit(value);
  }

  onEdit(value: string): void {
    this.edit.emit(value);
  }


}
