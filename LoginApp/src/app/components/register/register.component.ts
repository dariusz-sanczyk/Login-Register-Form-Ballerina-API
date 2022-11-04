import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomvalidatorService } from '../../services/customvalidator.service';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { GlobalVariables } from 'src/app/common/global-variables';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public isErrorOccur: boolean = false;

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private customValidator: CustomvalidatorService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(GlobalVariables.emailPattern),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(GlobalVariables.passwordPattern),
          ],
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

  public get form() {
    return this.registerForm.controls;
  }

  public reloadPage() {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['/login']);
  }

  public onSubmit() {
    this.isErrorOccur = false;

    const data: User = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this.loginService.registerUser(data).subscribe({
      next: () => {
        this.reloadPage();
      },
      error: () => {
        this.isErrorOccur = true;
      },
    });
  }
}
