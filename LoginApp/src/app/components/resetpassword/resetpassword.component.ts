import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Email } from 'src/app/models/email.model';
import { GlobalVariables } from '../../common/global-variables';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  public resetForm!: FormGroup;
  public isEmailExist: boolean = false;
  public isEmailNotFound: boolean = false;
  public errorMessage: string = '';

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.pattern(GlobalVariables.emailPattern)],
      ],
    });
  }

  public goToLogin() {
    this._router.navigate(['/login']);
  }

  public onSubmit(formData: Email) {
    this.errorMessage = '';
    this.isEmailNotFound = false;

    this.loginService.resetPassword(formData).subscribe({
      next: () => {
        this.isEmailExist = true;
        setTimeout(() => this.goToLogin(), 5000);
      },
      error: (err) => {
        if (err.status === 400) {
          this.isEmailNotFound = true;
        } else {
          this.errorMessage =
            'There is some problem with the server. Please try again later.';
        }
      },
    });
  }
}
