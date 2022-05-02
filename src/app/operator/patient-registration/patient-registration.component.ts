import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Patient } from 'src/app/core/models/Patient';
import { TriageColor } from 'src/app/core/models/TriageColor';
import { PatientsService } from 'src/app/core/services/patients.service';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {
  loading = false;
  submitted = false;
  model: Patient;

  constructor(
    private formBuilder: FormBuilder,
    private patientsService: PatientsService,
    private router: Router) {
    this.model = {
      firstName: 'Mario',
      lastName: 'Rossi',
      cf: 'RSSMRA70A01G273X',
      birthDate: new Date()
    };

  }

  ngOnInit(): void {

  }

  newPatient(): void {
    this.model = { firstName: '', lastName: '', cf: '', birthDate: new Date() };
  }


  onSubmit(): void {
    console.log(this.model);
    this.submitted = true;

    this.patientsService.addPatient(this.model).pipe(first()).subscribe(
      data => {
        this.router.navigate(['/operator/patients']);
      },
      error => {
        this.loading = false;
      }
    );

  }

}
