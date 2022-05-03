import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Patient } from 'src/app/core/models/Patient';
import { PatientsService } from 'src/app/core/services/patients.service';
import { DataTableActions } from 'src/app/shared/mytable/table.model';


@Component({
  selector: 'app-admin-patient',
  templateUrl: './admin-patient.component.html',
  styleUrls: ['./admin-patient.component.css']
})
export class AdminPatientComponent implements OnInit {

  patientList: Patient[] = [];
  headersPatientList: string[] = [];
  actions: DataTableActions[] = [];

  constructor(private patientsService: PatientsService,
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
    this.patientsService.getAllPatients().subscribe(
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
      case 'delete': {
        const id = objvalue.data.id;
        console.log(id)
        this.patientsService.deletePatient(id).pipe(first()).subscribe(
          (patient: Patient) => {
            this.patientList = this.patientList.filter((u) => u.id !== id);
          }
        );
        break;
      }
      case 'edit': {
        this.router.navigate(['/patients/edit', objvalue.data.id]);
        break;
      }
    }
  }

}
