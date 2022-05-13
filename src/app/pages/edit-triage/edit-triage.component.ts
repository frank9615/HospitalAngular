import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Patient } from 'src/app/core/models/Patient';
import { Triage } from 'src/app/core/models/Triage';
import { TriageColor } from 'src/app/core/models/TriageColor';
import { TriagesService } from 'src/app/core/services/triages.service';

@Component({
  selector: 'app-edit-triage',
  templateUrl: './edit-triage.component.html',
  styleUrls: ['./edit-triage.component.css']
})
export class EditTriageComponent implements OnInit {

  id: number = 0;
  triage: Triage;
  triageColor: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private triagesService: TriagesService
  ) {
    this.triage = this.newTriage();
    this.triageColor = Object.keys(TriageColor);
  }

  newTriage(): Triage {
    let triage = {
      notes: '',
      triageColor: TriageColor.GREEN,
      state: false,
    };
    this.triage = triage;
    return triage;
  }


  ngOnInit(): void {
    this.route.paramMap.pipe(first()).subscribe(params => {
      this.id = Number(params.get('id'));
      this.triagesService.getTriageById(this.id).pipe(first()).subscribe(
        (triage: Triage) => {
          this.triage = triage;
        });
    });
  }

  getTriageColor(): string[] {
    return this.triageColor.filter(color => { return this.triage.triageColor != color });
  }

  updateTriage(): void {
    if (this.triage) {
      this.triage.id = this.id;
      this.triagesService.updateTriage(this.triage).pipe(first()).subscribe(
        (triage: Triage) => {
          this.triage = triage;
        });
    }
  }
}
