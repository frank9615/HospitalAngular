import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/core/models/Patient';
import { PatientsService } from 'src/app/core/services/patients.service';


@Component({
  selector: 'app-admin-patient',
  templateUrl: './admin-patient.component.html',
  styleUrls: ['./admin-patient.component.css']
})
export class AdminPatientComponent implements OnInit {

  patientList: Patient[] = [];
  headersPatientList: string[] = [];

  constructor(private patientsService: PatientsService) { }

  ngOnInit(): void {
    this.patientsService.getAllPatients().subscribe(
      (patients: Patient[]) => {
        this.patientList = patients;
        this.headersPatientList = Object.getOwnPropertyNames(patients[0]);
      }
    );
  }

}
