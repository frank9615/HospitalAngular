import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OperatorHomeComponent } from "./operator-home/operator-home.component";
import { PatientRegistrationComponent } from "./patient-registration/patient-registration.component";
import { TriageRegistrationComponent } from "./triage-registration/triage-registration.component";



const routes: Routes = [
  {
    path: '',
    component: OperatorHomeComponent,
    children: [
      { path: 'patientregistration', component: PatientRegistrationComponent },
      { path: 'triageregistration', component: TriageRegistrationComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatorRoutingModule { }
