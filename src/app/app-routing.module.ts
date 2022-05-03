import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { Role } from './core/models/Role';
import { EditPatientComponent } from './pages/edit-patient/edit-patient.component';
import { EditTriageComponent } from './pages/edit-triage/edit-triage.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'doctor', loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule), canActivate: [AuthGuard], data: { roles: [Role.Doctor] } },
  { path: 'operator', loadChildren: () => import('./operator/operator.module').then(m => m.OperatorModule), canActivate: [AuthGuard], data: { roles: [Role.Operator] } },
  { path: 'users/edit/:id', component: EditUserComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'patients/edit/:id', component: EditPatientComponent, canActivate: [AuthGuard], data: { roles: [Role.Doctor, Role.Operator, Role.Admin] } },
  { path: 'triages/edit/:id', component: EditTriageComponent, canActivate: [AuthGuard], data: { roles: [Role.Doctor, Role.Operator, Role.Admin] } },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
