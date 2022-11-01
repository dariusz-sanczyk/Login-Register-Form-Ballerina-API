import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../models/email.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _http: HttpClient) {}

  baseUrl = 'http://localhost:7070';

  loginUser(loginData: User) {
    return this._http
      .post(`${this.baseUrl}/auth/login`, loginData)
      .subscribe(() => {});
  }

  registerUser(registerData: User) {
    return this._http
      .post(`${this.baseUrl}/users`, registerData)
      .subscribe(() => {});
  }

  resetPassword(resetEmail: Email) {
    return this._http
      .post(`${this.baseUrl}/users/resetPassword`, resetEmail)
      .subscribe(() => {});
  }
}
