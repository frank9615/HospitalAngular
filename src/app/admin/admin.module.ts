import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminPatientComponent } from './admin-patient/admin-patient.component';
import { AdminTriageComponent } from './admin-triage/admin-triage.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';



@NgModule({
  declarations: [
    AdminUsersComponent,
    AdminPatientComponent,
    AdminTriageComponent,
    AdminHomeComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class AdminModule { }
