import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApisService } from '../service/apis.service';
import { DataSharingService } from '../service/data-sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  isLogin: any
  isUserLoggedIn: any

  

  constructor(private dataSharingService: DataSharingService, public fb: FormBuilder, private apiService: ApisService, private toastr: ToastrService, private route: Router) {
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
  }

  ngOnInit(): void {
    this.LoginForm();
  }

  gettoken() {
    this.isLogin = localStorage.getItem('token');
  }

  //---------------------------Create Login Form------------------------------------------------------
  LoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required],Validators.minLength(6)],
    })
  }

  //---------------------------Get Form------------------------------------------------------------------
  get f() {
    return this.loginForm.controls;
  }

  //---------------------------Submit Form-----------------------------------------------------------------
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.apiService.loginUser(this.loginForm.value).subscribe(
        (data: any) => {
          this.toastr.success("SuccessFully User Login")
          localStorage.setItem("token", data.token)
          this.route.navigate(['/']);
          this.dataSharingService.isUserLoggedIn.next(true);
        },
        (err: HttpErrorResponse) => {
          if (err.error) {
            if (err.error.error) {
              this.toastr.error('Oops...', err.error.error)
            }
          } else {
            this.toastr.error('Oops...', 'Something went wrong!')
          }
        }
      );
      return;
    }

  }

}
