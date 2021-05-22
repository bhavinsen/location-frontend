import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class ApisService {
  //--------------defiend base url-----------------------------------------
  baseUri: string = 'https://messagelocationapi.herokuapp.com';

  //--------------Defiend headers------------------------------------------
  // headers = new HttpHeaders().set('Authorization',"Bearer" + localStorage.getItem("token"));
  headers:any = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  })

  constructor(private http: HttpClient) {
    console.log("test",this.headers)
   }


  //--------------Register New User Api--------------------------------------
  createNewUser(payload: any) {
    return this.http.post(`${this.baseUri}/signup/`, payload);
  }


  //-------------- Login-----------------------
  loginUser(payload:any){
    return this.http.post(`${this.baseUri}/login/`, payload)
  }

  //---------------------------Get All Users -----------------------------
  getAllUsers(){
    return this.http.get(`${this.baseUri}/users/`)
  }

  //---------------------------message post------------------------------
  messagePost(payload:any){
    return this.http.post(`${this.baseUri}/message/`,payload, 
    {headers: 
      {'Authorization': `Bearer ${localStorage.getItem("token")}`,}
    } 
    )
  }

  //---------------------------Get All Users -----------------------------
  getmessage(){
    return this.http.get(`${this.baseUri}/getmessage/`, {headers: 
      {'Authorization': `Bearer ${localStorage.getItem("token")}`,}
    } )
  }


}
