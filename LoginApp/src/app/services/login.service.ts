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

  public loginUser(loginData: User) {
    return this._http.post(`${GlobalVariables.baseUrl}/auth/login`, loginData);
  }

  public registerUser(registerData: User) {
    return this._http.post(`${GlobalVariables.baseUrl}/users`, registerData);
  }

  public resetPassword(resetEmail: Email) {
    return this._http.post(
      `${GlobalVariables.baseUrl}/users/resetPassword`,
      resetEmail
    );
  }
}
