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
import { Role } from '../models/Role';

const users: User[] = [
  { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
  { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.Operator },
  { id: 3, username: 'user2', password: 'user2', firstName: 'Normal', lastName: 'User', role: Role.Doctor },
];



@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(mergeMap(() => {
      //User Authentication
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
      return next.handle(request);
    }));

  }

}

