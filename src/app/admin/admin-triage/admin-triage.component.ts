import { Component, OnInit } from '@angular/core';
import { Triage } from 'src/app/core/models/Triage';
import { TriagesService } from 'src/app/core/services/triages.service';

@Component({
  selector: 'app-admin-triage',
  templateUrl: './admin-triage.component.html',
  styleUrls: ['./admin-triage.component.css']
})
export class AdminTriageComponent implements OnInit {

  triagesList: Triage[] = [];
  headersTriageList: string[] = [];

  constructor(private triageService: TriagesService) { }

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
}
