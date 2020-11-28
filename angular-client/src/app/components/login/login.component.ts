import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private _authService: AuthService, private _router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
  }

  isValid(controlName) {
    return (this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched);
  }

  login() {
    if (this.loginForm.valid) {
      console.log("VALID FORM")
      this._authService.submitLogin({
        "name": this.loginForm.controls.username.value,
        "password": this.loginForm.controls.password.value
      })
        .subscribe(
          data => {
            console.log(data['token']);
            localStorage.setItem("token", data['token'].toString());
            this._router.navigate(['/'])
          },
          error => { }
        )
    }

  }

}
