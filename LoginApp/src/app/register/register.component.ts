import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
// import { CustomvalidatorService } from '../services/customvalidator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder // private customValidator: CustomvalidatorService
  ) {}

  checkPasswordsAreEqual(
    password: string,
    confirmPassword: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const valueOfPassword = formGroup.get(password)?.value;
      const valueOfConfirmPassword = formGroup.get(confirmPassword)?.value;

      if (valueOfPassword === valueOfConfirmPassword) {
        return null;
      } else {
        return { passwordsDoNotMatch: true };
      }
    };
  }
  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$'),
          ],
        ],
        confirmPassword: [''],
      },
      {
        validator: this.checkPasswordsAreEqual('password', 'confirmPassword'),
      }
    );
  }

  get form() {
    return this.registerForm.controls;
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
  }
}
