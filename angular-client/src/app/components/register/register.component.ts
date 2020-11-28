import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  successMessage = "";
  constructor(private _authService: AuthService) {
    this.myForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.email),
      password: new FormControl(null, Validators.required),
      cnfpass: new FormControl(null, this.passValidator)
    });

    this.myForm.controls.password.valueChanges.subscribe(
      x => this.myForm.controls.cnfpass.updateValueAndValidity()
    );
  }

  ngOnInit(): void {
  }

  isValid(controlName) {
    return (this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched);
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassValue = control.value;
      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue != cnfpassValue || passValue === '') {
          return {
            isError: true
          };
        }
      }
    }
    return null;
  }

  register() {
    if (this.myForm.valid) {
      this._authService.submitRegister({
        "name": this.myForm.controls.username.value,
        "email": this.myForm.controls.email.value,
        "password": this.myForm.controls.password.value
      })
        .subscribe(
          data => this.successMessage = "SUCCESS",
          error => this.successMessage = "ERROR"
        )
    }
  }

}
