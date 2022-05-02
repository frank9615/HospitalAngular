import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/Patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>('/patients');
  }

  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`/patients/${id}`);
  }

  getPatientByCf(patientCf: string): Observable<Patient> {
    return this.http.get<Patient>(`/patients/cf/${patientCf}`);
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>('/addpatient', patient);
  }

  updatePatient(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`/updatepatient/${patient.id}`, patient);
  }

  deletePatient(id: number): Observable<Patient> {
    return this.http.delete<Patient>(`/deletepatient/${id}`);
  }
}
