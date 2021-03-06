import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/Patient';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  public baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}/api/patients`);
  }

  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/api/patients/search/id${id}`);
  }

  getPatientByCf(patientCf: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/api/patients/search/cf/${patientCf}`);
  }

  addPatient(patient: Patient): Observable<String> {
    return this.http.post<String>(`${this.baseUrl}/api/patients/new`, patient);
  }

  updatePatient(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.baseUrl}/api/patients/update`, patient);
  }

  deletePatient(id: number): Observable<Patient> {
    return this.http.delete<Patient>(`${this.baseUrl}/api/patients/delete/${id}`);
  }
  getPatientsAssignedToDoctor(doctor_id: number): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}/api/patients/assigned/doctor/id/${doctor_id}`);
  }
}
