import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FakeBackendInterceptor } from './core/interceptors/fakebackend.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { SharedModule } from './shared/shared.module';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { EditPatientComponent } from './pages/edit-patient/edit-patient.component';
import { EditTriageComponent } from './pages/edit-triage/edit-triage.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    EditUserComponent,
    EditPatientComponent,
    EditTriageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    /*{ provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
