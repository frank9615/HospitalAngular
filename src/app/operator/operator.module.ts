import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { OperatorHomeComponent } from './operator-home/operator-home.component';
import { TriageRegistrationComponent } from './triage-registration/triage-registration.component';
import { SharedModule } from '../shared/shared.module';
import { OperatorRoutingModule } from './operator-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PatientRegistrationComponent,
    OperatorHomeComponent,
    TriageRegistrationComponent
  ],
  imports: [
    OperatorRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OperatorModule { }
