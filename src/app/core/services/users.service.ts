import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('/users');
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`/users/${id}`);
  }
  getDoctorsList(): Observable<User[]> {
    return this.http.get<User[]>('/users/doctors');
  }
  getOperatorsList(): Observable<User[]> {
    return this.http.get<User[]>('/users/operators');
  }

  getAdminList(): Observable<User[]> {
    return this.http.get<User[]>('/users/admins');
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('/adduser', user);
  }


}
