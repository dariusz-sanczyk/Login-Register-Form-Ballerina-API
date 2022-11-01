import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Email } from 'src/app/models/email.model';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  public resetForm!: FormGroup;

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  goToLogin() {
    this._router.navigate(['/login']);
  }

  onSubmit(formData: Email) {
    console.log(formData);
    this.loginService.resetPassword(formData);
  }
}
