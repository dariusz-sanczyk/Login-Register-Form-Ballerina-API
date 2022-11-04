import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { GlobalVariables } from 'src/app/common/global-variables';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public isLoginSuccesful: boolean = false;
  public isLoginError: boolean = false;
  public isServerError: boolean = false;
  public errorMessage: string = '';

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.pattern(GlobalVariables.emailPattern)],
      ],
      password: ['', [Validators.required]],
    });
  }

  public goToReset() {
    this._router.navigate(['/reset']);
  }

  public onSubmit(form: User) {
    this.isLoginError = false;
    this.isLoginSuccesful = false;
    this.isServerError = false;

    this.loginService.loginUser(form).subscribe({
      next: () => {
        this.isLoginSuccesful = true;
      },
      error: (err) => {
        if (err.status === 401) {
          this.isLoginError = true;
          this.errorMessage = 'Wrong e-mail or password !';
        } else {
          this.isServerError = true;
          this.errorMessage =
            'There is some problem with the server. Please try again later.';
        }
      },
    });
  }
}
