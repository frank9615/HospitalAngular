import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { DoctorPatientComponent } from './doctor-patient/doctor-patient.component';
import { DoctorRoutingModule } from './doctor-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DoctorHomeComponent,
    DoctorPatientComponent
  ],
  imports: [
    DoctorRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class DoctorModule { }
