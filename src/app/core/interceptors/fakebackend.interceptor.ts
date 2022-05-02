import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { delay, dematerialize, materialize, mergeMap, Observable, of, throwError } from 'rxjs';
import { User } from '../models/User';
import users from '../../../../mock/users.json';
import patients from '../../../../mock/patients.json';
import triages from '../../../../mock/triages.json';
import { Role } from '../models/Role';
import { Patient } from '../models/Patient';
import { Triage } from '../models/Triage';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() { }

  // Get List of Users without password
  private get usersWOP(): User[] {
    return users.map((user: User) => {
      return {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      };
    });
  }

  //Ipotizzo che i dati mock non siano ordinati
  private getLastPatientId(): number {
    return patients.reduce((max: number, p: Patient) => {
      if (p.id) {
        return p.id > max ? p.id : max, 0;
      }
      return 0;
    });
  }

  private getLastTriageId(): number {
    return triages.reduce((max: number, t: Triage) => {
      if (t.id) {
        return t.id > max ? t.id : max, 0;
      }
      return 0;
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(mergeMap(() => {

      //Gestire con uno switch case

      //User Authentication✅
      if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
        const user = users.find((x: User) => x.username === request.body.username && x.password === request.body.password);
        if (user) {
          const body = {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token: 'fake-jwt-token',
            role: user.role
          };
          return of(new HttpResponse({ status: 200, body }));
        } else {
          throwError(() => new Error('Username or password is incorrect'))
        }
      }
      //Get All Patients✅
      if (request.url.endsWith('/patients') && request.method === 'GET') {
        return of(new HttpResponse({ status: 200, body: patients }));
      }
      //Get All Triages✅
      if (request.url.endsWith('/triages') && request.method === 'GET') {
        return of(new HttpResponse({ status: 200, body: triages }));
      }
      //Get All Users✅
      if (request.url.endsWith('/users') && request.method === 'GET') {
        //Map result removing password
        const usersResponse = this.usersWOP;
        return of(new HttpResponse({ status: 200, body: usersResponse }));
      }

      // Get User by Id✅
      if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
        const urlParts = request.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 1]);
        const user = users.find((x: User) => x.id === id);
        if (user) {
          const body = {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
          };
          return of(new HttpResponse({ status: 200, body }));
        } else {
          return throwError(() => new Error('User not found'));
        }
      }

      //Get Patient By Id✅
      if (request.url.match(/\/patients\/\d+$/) && request.method === 'GET') {
        const urlParts = request.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 1]);
        const patient = patients.find((x: any) => x.id === id);
        if (patient) {
          const body = {
            id: patient.id,
            cf: patient.cf,
            firstName: patient.firstName,
            lastName: patient.lastName,
            birthDate: patient.birthDate,
            registrationDate: patient.registrationDate
          };
          return of(new HttpResponse({ status: 200, body }));
        } else {
          return throwError(() => new Error('Patient not found'));
        }
      }
      // Get Triages by Id✅
      if (request.url.match(/\/triages\/\d+$/) && request.method === 'GET') {
        const urlParts = request.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 1]);
        const triage = triages.find((x: any) => x.id === id);
        if (triage) {
          const body = {
            id: triage.id,
            patientId: triage.patientId,
            doctorId: triage.doctorId,
            operatorId: triage.operatorId,
            triageDate: triage.triageDate,
            triageColor: triage.triageColor,
            notes: triage.notes,
            state: triage.state
          };
          return of(new HttpResponse({ status: 200, body }));
        } else {
          return throwError(() => new Error('Triage not found'));
        }
      }
      //Get Triages Associated Doctors✅
      if (request.url.match(/\/triages\/\d+\/doctor$/) && request.method === 'GET') {
        const urlParts = request.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 2]);
        const triageAssociated = triages.filter((x: any) => x.doctorId === id);
        if (triageAssociated) {
          return of(new HttpResponse({ status: 200, body: triageAssociated }));
        } else {
          return throwError(() => new Error('Triage not found'));
        }
      }
      //Get Triages Associated Operators✅
      if (request.url.match(/\/triages\/\d+\/operator$/) && request.method === 'GET') {
        const urlParts = request.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 2]);
        const triageAssociated = triages.filter((x: any) => x.operatorId === id);
        if (triageAssociated) {
          return of(new HttpResponse({ status: 200, body: triageAssociated }));
        } else {
          return throwError(() => new Error('Triage not found'));
        }
      }
      //Get Triages Associated Patients✅
      if (request.url.match(/\/triages\/\d+\/patient$/) && request.method === 'GET') {
        const urlParts = request.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 2]);
        const triageAssociated = triages.filter((x: any) => x.patientId === id);
        if (triageAssociated) {
          return of(new HttpResponse({ status: 200, body: triageAssociated }));
        } else {
          return throwError(() => new Error('Triage not found'));
        }
      }
      //Get Doctors✅
      if (request.url.match(/\/users\/doctors$/) && request.method === 'GET') {
        const doctors = this.usersWOP.filter((x) => { return x.role === Role.Doctor });
        if (doctors) {
          return of(new HttpResponse({ status: 200, body: doctors }));
        } else {
          return throwError(() => new Error('Doctors not found'));
        }
      }

      //Get Operators✅
      if (request.url.match(/\/users\/operators$/) && request.method === 'GET') {
        const operators = this.usersWOP.filter((x) => { return x.role === Role.Operator });
        if (operators) {
          return of(new HttpResponse({ status: 200, body: operators }));
        } else {
          return throwError(() => new Error('Operators not found'));
        }
      }

      //Get Administrators✅
      if (request.url.match(/\/users\/administrators$/) && request.method === 'GET') {
        const administrator = this.usersWOP.filter((x) => { return x.role === Role.Admin });
        if (administrator) {
          return of(new HttpResponse({ status: 200, body: administrator }));
        } else {
          return throwError(() => new Error('Administrators not found'));
        }
      }

      // Add User (only for Admin)✅
      if (request.url.match(/\/adduser$/) && request.method === 'POST') {
        const user = request.body;
        this.usersWOP.push(user);
        return of(new HttpResponse({ status: 200, body: user }));
      }

      //Add Patient (only for Operator)✅
      if (request.url.match(/\/addpatient$/) && request.method === 'POST') {
        let patient = request.body;
        patient.id = this.getLastPatientId() + 1;
        patient.registrationDate = new Date();
        patients.push(patient);
        return of(new HttpResponse({ status: 200, body: patient }));
      }
      //Add Triage✅
      if (request.url.match(/\/addtriage$/) && request.method === 'POST') {
        const triage = request.body;
        triage.id = this.getLastTriageId() + 1;
        triage.triageDate = new Date();
        triages.push(triage);
        return of(new HttpResponse({ status: 200, body: triage }));
      }
      // Update User (only for Admin)✅
      if (request.url.match(/\/updateuser\/\d+$/) && request.method === 'PUT') {
        const urlParts = request.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 1]);
        const user = request.body;
        const index = this.usersWOP.findIndex((x) => x.id === id);
        if (index !== -1) {
          this.usersWOP[index] = user;
          return of(new HttpResponse({ status: 200, body: user }));
        } else {
          return throwError(() => new Error('User not found'));
        }
      }
      // Update Patient (only for Operator )✅
      if (request.url.match(/\/updatepatient\/\d+$/) && request.method === 'PUT') {
        const urlParts = request.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 1]);
        const patient = request.body;
        const index = patients.findIndex((x: Patient) => x.id === id);
        if (index !== -1) {
          patients[index] = patient;
          return of(new HttpResponse({ status: 200, body: patient }));
        } else {
          return throwError(() => new Error('Patient not found'));
        }
      }
      // Update Triage (only for Operator )✅
      if (request.url.match(/\/updatetriage\/\d+$/) && request.method === 'PUT') {
        const urlParts = request.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 1]);
        const triage = request.body;
        const index = triages.findIndex((x: Triage) => x.id === id);
        if (index !== -1) {
          triages[index] = triage;
          return of(new HttpResponse({ status: 200, body: triage }));
        } else {
          return throwError(() => new Error('Triage not found'));
        }
      }

      // Delete User (only for Admin)✅
      if (request.url.match(/\/deleteuser\/\d+$/) && request.method === 'DELETE') {
        const urlParts = request.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 1]);
        const index = this.usersWOP.findIndex((x) => x.id == id);
        if (index !== -1) {
          this.usersWOP.splice(index, 1);
          return of(new HttpResponse({ status: 200, body: {} }));
        } else {
          return throwError(() => new Error('User not found'));
        }
      }
      // Delete Patient (only for Operator)✅
      if (request.url.match(/\/deletepatient\/\d+$/) && request.method === 'DELETE') {
        const urlParts = request.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 1]);
        const index = patients.findIndex((x: Patient) => x.id === id);
        if (index !== -1) {
          patients.splice(index, 1);
          return of(new HttpResponse({ status: 200, body: {} }));
        } else {
          return throwError(() => new Error('Patient not found'));
        }
      }

      // Delete Triage (only for Operator)✅
      if (request.url.match(/\/deletetriage\/\d+$/) && request.method === 'DELETE') {
        const urlParts = request.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 1]);
        const index = triages.findIndex((x: Triage) => x.id === id);
        if (index !== -1) {
          triages.splice(index, 1);
          return of(new HttpResponse({ status: 200, body: {} }));
        } else {
          return throwError(() => new Error('Triage not found'));
        }
      }
      return next.handle(request);
    }));

  }

}

