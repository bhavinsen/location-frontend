import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  isLogin: any
  decoded: any

  constructor(private toastr: ToastrService, private route: Router) {
  }

  ngOnInit(): void {
    this.gettoken()
  }


  gettoken() {
    this.isLogin = localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem("token")
    this.route.navigateByUrl("/login")
    this.toastr.success('SuccessFully Logout!');
    this.gettoken()
  }
}
