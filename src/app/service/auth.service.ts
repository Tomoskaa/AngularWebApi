import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../signup/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loginAPIUrl : string = "https://localhost:44314/api/Login/"; 
  user!: UserModel | null;
  redirectUrl!: string;

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  constructor(private http : HttpClient) { }

  signUp(data : any) {
    return this.http.post<any>(this.loginAPIUrl + "signUp", data);
    //return this.http.post<any>(`${this.loginAPIUrl}signup`, data);
  }

  login(data : any) {
    return this.http.post<any>(this.loginAPIUrl + "login", data);
  }

  logout(): void {
    this.user = null;
  }
}
