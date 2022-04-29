import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;
  public user = new UserModel();
  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router : Router,
    private api : AuthService, private toastr : ToastrService) { }

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      'fullname': new FormControl('', Validators.required),
      'username': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'mobile': new FormControl('', [Validators.required, Validators.pattern('^(?:[+0]9)?[0-9]{10}$')]),
      'userRole': new FormControl('', Validators.required)
    })
  }

  signUp() {
    //this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
    //.subscribe(result => {
    //  //alert("Signup successfully!");
    //  this.toastr.success("Signup successfully!");
    //  this.signupForm.reset();
    //  this.router.navigate(['login']);
    //},
    //err => {
    //  this.toastr.error("Error!");
    //})
    this.user.FullName = this.signupForm.value.fullname;
    this.user.Username = this.signupForm.value.username;
    this.user.Password = this.signupForm.value.password;
    this.user.Mobile = this.signupForm.value.mobile;
    this.user.UserRole = this.signupForm.value.userRole;

    this.api.signUp(this.signupForm.value)
    .subscribe(result => {
      this.toastr.success("Signup successfully!", 'User can be loged');
      this.signupForm.reset();
      this.router.navigate(['login']);
    },
    err => {
      this.toastr.success("There was an error.", 'Try again later!');
    })
  }
}
