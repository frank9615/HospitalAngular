import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Patient } from 'src/app/core/models/Patient';
import { Triage } from 'src/app/core/models/Triage';
import { TriageColor } from 'src/app/core/models/TriageColor';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/services/auth.service';
import { PatientsService } from 'src/app/core/services/patients.service';
import { TriagesService } from 'src/app/core/services/triages.service';
import { UsersService } from 'src/app/core/services/users.service';
import { TriageRegistration } from './TriageRegistration';

@Component({
  selector: 'app-triage-registration',
  templateUrl: './triage-registration.component.html',
  styleUrls: ['./triage-registration.component.css']
})
export class TriageRegistrationComponent implements OnInit {

  loading = false;
  submitted = false;
  model: TriageRegistration;
  doctorList: User[];
  colors: string[];

  constructor(private formBuilder: FormBuilder,
    private triageService: TriagesService,
    private router: Router,
    private usersService: UsersService,
    private patientsService: PatientsService,
    private authService: AuthService) {
    this.model = this.newTriage();
    this.doctorList = [];
    this.colors = [];
  }

  ngOnInit(): void {
    this.usersService.getDoctorsList().pipe(first()).subscribe(
      (data: User[]) => {
        this.doctorList = data;
      }
    );
    this.colors = Object.keys(TriageColor);
  }

  newTriage(): TriageRegistration {
    let modelempty = {
      patientCf: '',
      notes: '',
      triageColor: TriageColor.GREEN,
      doctorId: 0
    }
    this.model = modelempty;
    return modelempty;
  }

  onSubmit(): void {
    console.log(this.model);
    this.submitted = true;
    // From TriageRegistration to Triage
    //get operatorid from localstorage
    let triage: Triage = {
      notes: this.model.notes,
      triageColor: this.model.triageColor,
      doctorId: this.model.doctorId,
      state: false,
      operatorId: this.authService.currentUserValue.id
    };
    //fetch patient from cf
    this.patientsService.getPatientByCf(this.model.patientCf).pipe(first()).subscribe(
      (patient: Patient) => {
        if (patient) {
          triage.patientId = patient.id;
          this.triageService.addTriage(triage).pipe(first()).subscribe(
            (triagedata: Triage) => {
              this.router.navigate(['/triage-list']);
            }
          );
        }
      }
    );
  }


}
