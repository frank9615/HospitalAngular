import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { AdminPatientComponent } from "./admin-patient/admin-patient.component";
import { AdminTriageComponent } from "./admin-triage/admin-triage.component";
import { AdminUsersComponent } from "./admin-users/admin-users.component";

const routes: Routes = [
  {
    path: '',
    component: AdminHomeComponent,
    children: [
      { path: 'users', component: AdminUsersComponent },
      { path: 'patients', component: AdminPatientComponent },
      { path: 'triages', component: AdminTriageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
