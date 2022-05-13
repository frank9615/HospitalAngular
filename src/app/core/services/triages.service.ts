import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Triage } from '../models/Triage';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TriagesService {
  public baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllTriages(): Observable<Triage[]> {
    return this.http.get<Triage[]>(`${this.baseUrl}/api/triages`);
  }

  getTriageById(id: number): Observable<Triage> {
    return this.http.get<Triage>(`${this.baseUrl}/api/triages/search/id${id}`);
  }

  getTriagesBydoctor_id(id: number): Observable<Triage[]> {
    return this.http.get<Triage[]>(`${this.baseUrl}/api/triages/of/doctor/${id}`);
  }

  getTriagesByoperator_id(id: number): Observable<Triage[]> {
    return this.http.get<Triage[]>(`${this.baseUrl}/api/triages/of/operator/${id}`);
  }

  getTriagesBypatient_id(id: number): Observable<Triage[]> {
    return this.http.get<Triage[]>(`${this.baseUrl}/api/triages/of/patient/${id}`);
  }

  addTriage(triage: Triage): Observable<Triage> {
    return this.http.post<Triage>(`${this.baseUrl}/api/triages/new`, triage);
  }

  updateTriage(triage: Triage): Observable<Triage> {
    return this.http.put<Triage>(`${this.baseUrl}/api/triages/update`, triage);
  }

  deleteTriage(id: number): Observable<Triage> {
    return this.http.delete<Triage>(`${this.baseUrl}/api/triages/delete/id/${id}`);
  }

}
