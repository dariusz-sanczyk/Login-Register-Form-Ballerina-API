import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomvalidatorService } from '../../services/customvalidator.service';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private customValidator: CustomvalidatorService,
    private loginService: LoginService
  ) {}

  passwordPattern = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$';

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, Validators.pattern(this.passwordPattern)],
        ],

        confirmPassword: [''],
      },
      {
        validators: this.customValidator.checkPasswordsMatch(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  reloadPage() {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['/login']);
  }

  get form() {
    return this.registerForm.controls;
  }

  onSubmit() {
    const data: User = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };
    console.log(data);
    this.loginService.registerUser(data);
    this.reloadPage();
  }
}
