import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ApisService } from '../service/apis.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  lat !: number
  lng !: number


  constructor(private apiService: ApisService, public fb: FormBuilder, private toastr: ToastrService, private route: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.SignupForm();
    this.getLocation();
  }


  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          console.log("position", position)
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lat);
        }
      },
        (error) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }


  getGeoCodingUrl(longitude: number, latitude: number) {
    this.http.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`).subscribe((data) => {
      console.log("test", data)
    })
  }
  //---------------------------Create Signup Form------------------------------------------------------
  SignupForm() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      country: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirm: ['', [Validators.required]],
    })
  }


  //---------------------------Get Form------------------------------------------------------------------
  get f() {
    return this.registerForm.controls;
  }

  //---------------------------Submit Form-----------------------------------------------------------------
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.registerForm.value.latitude =  this.lat
      this.registerForm.value.longitude =  this.lng
      this.registerForm.value.username = this.registerForm.value.email
      console.log(this.registerForm.value)
      this.apiService.createNewUser(this.registerForm.value).subscribe(
        (data: any) => {
          console.log("data",data)
          this.toastr.success("SuccessFully Register User")
          this.route.navigate([ '/login' ]);
        },
        (err: HttpErrorResponse) => {
          if (err.error) {
            if(err.error.email){
              this.toastr.error('Oops...', err.error.email)
            }
          } else {
            this.toastr.error('Oops...', 'Something went wrong!')
          }
        }
      );
      return;
    } else {
      this.toastr.success("User SuccessFully Registerd")
      this.route.navigateByUrl('/login')
    }
  }
}
