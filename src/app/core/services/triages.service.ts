import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Triage } from '../models/Triage';

@Injectable({
  providedIn: 'root'
})
export class TriagesService {

  constructor(private http: HttpClient) { }

  getAllTriages(): Observable<Triage[]> {
    return this.http.get<Triage[]>('/triages');
  }

  getTriageById(id: number): Observable<Triage> {
    return this.http.get<Triage>(`/triages/${id}`);
  }

  getTriagesByDoctorId(id: number): Observable<Triage[]> {
    return this.http.get<Triage[]>(`/triages/${id}/doctor`);
  }

  getTriagesByOperatorId(id: number): Observable<Triage[]> {
    return this.http.get<Triage[]>(`/triages/${id}/operator`);
  }

  getTriagesByPatientId(id: number): Observable<Triage[]> {
    return this.http.get<Triage[]>(`/triages/${id}/patient`);
  }

  addTriage(triage: Triage): Observable<Triage> {
    return this.http.post<Triage>('/addtriage', triage);
  }

  updateTriage(triage: Triage): Observable<Triage> {
    return this.http.put<Triage>(`/updatetriage/${triage.id}`, triage);
  }

  deleteTriage(id: number): Observable<Triage> {
    return this.http.delete<Triage>(`/deletetriage/${id}`);
  }

}
