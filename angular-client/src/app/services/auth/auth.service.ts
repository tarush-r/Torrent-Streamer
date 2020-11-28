import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  submitRegister(body: any){
    console.log(body)
    return this._http.post('http://localhost:3000/auth/register', body, {
      observe: 'body'
    });
  }

  submitLogin(body: any){
    console.log(body)
    return this._http.post('http://localhost:3000/auth/login', body, {
      observe: 'body'
    });
  }

  getUsername(){
    return this._http.get('http://localhost:3000/auth/username', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  
}
