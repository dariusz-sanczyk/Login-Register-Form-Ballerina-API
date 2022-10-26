import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomvalidatorService {
  constructor() {}

  checkPasswordsMatch(password: string, confirmPassword: string): ValidatorFn {
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
}
