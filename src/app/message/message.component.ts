import { Component, OnInit } from '@angular/core';
import { ApisService } from '../service/apis.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  latitude !: number;
  longitude !: number;
  lat !: number
  lng !: number
  message: any = []
  constructor(private apiService: ApisService) { }

  ngOnInit(): void {
    this.getmessage()
    this.getLocation()
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


  getmessage() {
    this.apiService.getmessage().subscribe((data: any) => {
      console.log("data", data)
      this.message = data
    })
  }
}

