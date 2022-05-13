import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Patient } from 'src/app/core/models/Patient';
import { Triage } from 'src/app/core/models/Triage';
import { AuthService } from 'src/app/core/services/auth.service';
import { PatientsService } from 'src/app/core/services/patients.service';
import { TriagesService } from 'src/app/core/services/triages.service';
import { DataTableActions } from 'src/app/shared/mytable/table.model';

@Component({
  selector: 'app-doctor-patient',
  templateUrl: './doctor-patient.component.html',
  styleUrls: ['./doctor-patient.component.css']
})
export class DoctorPatientComponent implements OnInit {
  patientList: Patient[] = [];
  headersPatientList: string[] = [];
  actions: DataTableActions[] = [];

  constructor(
    private patientService: PatientsService,
    private authService: AuthService,
    private triagesService: TriagesService,
    private router: Router) {
    this.actions = [
      {
        label: 'View',
        actionIdToReturn: 'view',
        icon: 'bi bi-zoom-in'
      }];
  }

  ngOnInit(): void {
    let doctor_id = this.authService.currentUserValue.id;
    this.patientService.getPatientsAssignedToDoctor(doctor_id).pipe(first()).subscribe(
      (patients: Patient[]) => {
        this.patientList = patients;
        this.headersPatientList = Object.getOwnPropertyNames(patients[0]);
      }
    );
  }

  eventcatcher(value: any): void {
    let objvalue: any = JSON.parse(JSON.stringify(value));
    let actionIdToReturn: string = objvalue.actionType;
    console.log(actionIdToReturn);
    switch (actionIdToReturn) {
      case 'view': {
        //This id is the patient id but we need the traige id
        this.triagesService.getTriagesBypatient_id(objvalue.data.id).pipe(first()).subscribe(
          (triages: Triage[]) => {
            //Get Last Triage order by id
            let triage: Triage = triages.reduce((prev: Triage, curr: Triage) => {
              if (prev.id && curr.id) {
                return prev.id > curr.id ? prev : curr;
              }
              return curr;
            });
            this.router.navigate(['/triages/edit', triage.id]);
          });
        break;
      }
    }
  }

}
