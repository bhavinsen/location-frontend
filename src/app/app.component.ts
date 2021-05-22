import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { ToastrService } from 'ngx-toastr';
import { DataSharingService } from './service/data-sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  isLogin: any
  decoded: any
  isUserLoggedIn:any

  constructor(private toastr: ToastrService, private route: Router,private dataSharingService: DataSharingService) {
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
  });
  }

  ngOnInit(): void {
   this.gettoken()
  }


  gettoken() {
    this.isLogin = localStorage.getItem('token');
    if(this.isLogin !== "" ){
      this.dataSharingService.isUserLoggedIn.next(true);

    }
  }

  logout() {
    localStorage.removeItem("token")
    this.route.navigateByUrl("/login")
    this.toastr.success('SuccessFully Logout!');
    this.gettoken()
    this.dataSharingService.isUserLoggedIn.next(false);
  }
}
