import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { DoctorPatientComponent } from './doctor-patient/doctor-patient.component';



@NgModule({
  declarations: [
    DoctorHomeComponent,
    DoctorPatientComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DoctorModule { }
