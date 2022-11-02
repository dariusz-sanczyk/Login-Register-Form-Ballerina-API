import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariables } from '../common/global-variables';
import { Email } from '../models/email.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _http: HttpClient) {}

  loginUser(loginData: User) {
    return this._http.post(`${GlobalVariables.baseUrl}/auth/login`, loginData);
  }

  registerUser(registerData: User) {
    return this._http.post(`${GlobalVariables.baseUrl}/users`, registerData);
  }

  resetPassword(resetEmail: Email) {
    return this._http.post(
      `${GlobalVariables.baseUrl}/users/resetPassword`,
      resetEmail
    );
  }
}
