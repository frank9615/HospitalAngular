import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DoctorHomeComponent } from "./doctor-home/doctor-home.component";
import { DoctorPatientComponent } from "./doctor-patient/doctor-patient.component";


const routes: Routes = [
  {
    path: '',
    component: DoctorHomeComponent,
    children: [
      { path: 'patients', component: DoctorPatientComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
