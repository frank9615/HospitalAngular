import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { Role } from './core/models/Role';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'doctor', loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule), canActivate: [AuthGuard], data: { roles: [Role.Doctor] } },
  { path: 'operator', loadChildren: () => import('./operator/operator.module').then(m => m.OperatorModule), canActivate: [AuthGuard], data: { roles: [Role.Operator] } },
  /* deve essere l'ultimo elemento del routing */
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
