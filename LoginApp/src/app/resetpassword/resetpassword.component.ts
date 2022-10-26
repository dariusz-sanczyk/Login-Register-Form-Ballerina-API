import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  public resetForm: FormGroup;

  constructor(private _router: Router, public fb: FormBuilder) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  goToLogin() {
    this._router.navigate(['/login']);
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
  }

  ngOnInit(): void {}
}
