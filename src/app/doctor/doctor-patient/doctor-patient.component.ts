import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Patient } from 'src/app/core/models/Patient';
import { AuthService } from 'src/app/core/services/auth.service';
import { PatientsService } from 'src/app/core/services/patients.service';
import { TriagesService } from 'src/app/core/services/triages.service';

@Component({
  selector: 'app-doctor-patient',
  templateUrl: './doctor-patient.component.html',
  styleUrls: ['./doctor-patient.component.css']
})
export class DoctorPatientComponent implements OnInit {
  patientList: Patient[] = [];
  headersPatientList: string[] = [];

  constructor(
    private patientService: PatientsService,
    private authService: AuthService) { }

  ngOnInit(): void {
    let doctorid = this.authService.currentUserValue.id;
    this.patientService.getPatientsAssignedToDoctor(doctorid).pipe(first()).subscribe(
      (patients: Patient[]) => {
        this.patientList = patients;
        this.headersPatientList = Object.getOwnPropertyNames(patients[0]);
      }
    );
  }

}
