import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { UserModel } from '../signup/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;
  
  public user = new UserModel();
  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router : Router,
    private api : AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.loginForm = this.formBuilder.group({
      //email: ['', Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      //password: ['', Validators.required, Validators.minLength(6)]
      //username: [''],
      //password: ['']
    //})

    this.loginForm = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  login() {
    //this.http.get<any>("http://localhost:3000/signupUsers")
    //.subscribe(result => {
    //  const user = result.find((a:any) => {
    //    return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
    //  });
    //  if(user) {
    //    this.toastr.success("Login Success!");
    //    this.loginForm.reset();
    //    this.router.navigate(['products']);
    //  } else {
    //    this.toastr.error("User not found!")
    //  }
    //}, err => {
    //  this.toastr.error("User not found!")
    //})

    this.user.Username = this.loginForm.value.username;
    this.user.Password = this.loginForm.value.password;

    this.api.login(this.loginForm.value)
    .subscribe(result => {
      if(this.api.redirectUrl) {
        this.router.navigateByUrl(this.api.redirectUrl);
      } else {
        this.toastr.success("Login Success!");
        this.loginForm.reset();
        this.router.navigate(['products']);
      }
    })

  }
}
