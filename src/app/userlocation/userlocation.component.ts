import { Component, OnInit, ViewChild, ElementRef, NgZone,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApisService } from '../service/apis.service';
import { MapsAPILoader } from '@agm/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-userlocation',
  templateUrl: './userlocation.component.html',
  styleUrls: ['./userlocation.component.css']
})
export class UserlocationComponent implements OnInit {
  lat !: number
  lng !: number
  isLogin: any
  Users: any = []

  latitude !: number;
  longitude !: number;
  zoom !: number;
  address !: string;
  scroll: boolean = false;

  modalRef:any= BsModalRef

  messageForm!: FormGroup;
  loading = false;
  submitted = false;

  new_latitude : any
  new_longitude : any

  @ViewChild('search')
  public searchElementRef: any = ElementRef;

  constructor(public fb: FormBuilder, private ngZone: NgZone, private apiService: ApisService, private toastr: ToastrService, private route: Router,private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getLocation();
    this.getAllUsers();
    this.MessageForm()
  }
   
   //---------------------------Create Login Form------------------------------------------------------
   MessageForm() {
    this.messageForm = this.fb.group({
      message: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
    })
  }
  
  //---------------------------Get Form------------------------------------------------------------------
  get f() {
      return this.messageForm.controls;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  clickLocation($event: any) {
    console.log("latitude", $event.coords)
    console.log("test", $event.placeId)
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
    console.log(this.clickedMarker);
    this.Users[index].visible = false;
  }
 
  mapClicked($event: any = MouseEvent) {
    console.log($event)
    this.Users.push({
      latitude: $event.coords.lat,
      longitude: $event.coords.lng,
      draggable: true,
      visible: true,
      opacity: 0.4
    });
    this.new_latitude = $event.coords.lat
    this.new_longitude = $event.coords.lng

  }


  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.messageForm.invalid) {
      this.messageForm.value.latitude = this.new_latitude
      this.messageForm.value.longitude = this.new_longitude
      console.log(this.messageForm.value)
      this.apiService.messagePost(this.messageForm.value).subscribe(
        (data: any) => {
          console.log("data",data)
          this.toastr.success("SuccessFully save Location and message")
          this.route.navigate([ '/user-location' ]);
        },
        (err: HttpErrorResponse) => {
          if (err.error) {
            console.log(err.error)
            if(err.error){
              this.toastr.error('Oops...', err.error)
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
  

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          console.log("position", position)
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          // console.log(this.lat);
          // console.log(this.lat);
        }
      },
        (error) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getAllUsers() {
    this.apiService.getAllUsers().subscribe((data: any) => {
      console.log("Users", data)
      this.Users = data
    })
  }

}
