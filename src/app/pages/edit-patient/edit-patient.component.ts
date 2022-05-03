import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Patient } from 'src/app/core/models/Patient';
import { PatientsService } from 'src/app/core/services/patients.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {
  id: number = 0;
  patient: Patient;

  constructor(private route: ActivatedRoute,
    private patientsService: PatientsService) {
    this.patient = this.newPatient();
  }
  newPatient(): Patient {
    let patient = {
      cf: '',
      firstName: '',
      lastName: '',
      birthDate: new Date(),
    };
    this.patient = patient;
    return patient;
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(first()).subscribe(params => {
      this.id = Number(params.get('id'));
      this.patientsService.getPatientById(this.id).pipe(first()).subscribe(
        (patient: Patient) => {
          this.patient = patient;
        });
    });
  }

  updatePatient(): void {
    console.log(this.patient);
    if (this.patient) {
      this.patientsService.updatePatient(this.patient).pipe(first()).subscribe(
        (patient: Patient) => {
          this.patient = patient;
        });
    }
  }
}
