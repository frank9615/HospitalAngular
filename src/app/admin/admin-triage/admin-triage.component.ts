import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Triage } from 'src/app/core/models/Triage';
import { TriagesService } from 'src/app/core/services/triages.service';
import { DataTableActions } from 'src/app/shared/mytable/table.model';

@Component({
  selector: 'app-admin-triage',
  templateUrl: './admin-triage.component.html',
  styleUrls: ['./admin-triage.component.css']
})
export class AdminTriageComponent implements OnInit {

  triagesList: Triage[] = [];
  headersTriageList: string[] = [];
  actions: DataTableActions[] = [];

  constructor(private triageService: TriagesService,
    private router: Router) {
    this.actions = [{
      label: 'Delete',
      actionIdToReturn: 'delete',
      icon: 'bi bi-trash'
    },
    {
      label: 'Edit',
      actionIdToReturn: 'edit',
      icon: 'bi bi-pencil'
    }];
  }

  ngOnInit(): void {
    this.triageService.getAllTriages().subscribe(
      (triages: Triage[]) => {
        this.triagesList = triages;
        this.headersTriageList = Object.getOwnPropertyNames(triages[0]);
      }
    );
  }

  deleteItem(value: string): void {
    let triage: Triage = JSON.parse(JSON.stringify(value));
    let id: number | undefined = triage.id;
    if (id) {
      this.triageService.deleteTriage(id).subscribe(
        (triage: Triage) => {
          this.triagesList = this.triagesList.filter(
            (triage: Triage) => triage.id !== id
          )
        });
    }
  }
  eventcatcher(value: any): void {
    let objvalue: any = JSON.parse(JSON.stringify(value));
    let actionIdToReturn: string = objvalue.actionType;
    console.log(actionIdToReturn);
    switch (actionIdToReturn) {
      case 'delete': {
        const id = objvalue.data.id;
        console.log(id)
        this.triageService.deleteTriage(id).pipe(first()).subscribe(
          (triage: Triage) => {
            this.triagesList = this.triagesList.filter((u) => u.id !== id);
          }
        );
        break;
      }
      case 'edit': {
        this.router.navigate(['/triages/edit', objvalue.data.id]);
        break;
      }
    }
  }
}
