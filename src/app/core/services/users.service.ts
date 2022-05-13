import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { environment } from '../../../environments/environment';
import { SearchCriteria } from '../models/SearchCriteria';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllUserswithFilter(searchCriteria: SearchCriteria, pagenum: number, numel: number): Observable<User[]> {
    return this.http.post<User[]>(`${this.baseUrl}/api/users/filter/pagenum/numel`, searchCriteria);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/api/users`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/users/search/id/${id}`);
  }
  getDoctorsList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/api/users/list/role/doctor`);
  }
  getOperatorsList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/api/users/list/role/operator`);
  }

  getAdminList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/api/users/list/role/admin`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/api/users/new`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/api/users/update`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/api/users/delete/id/${id}`);
  }


}
