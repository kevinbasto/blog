import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor() { }

  public title : string = "Solicitudes";
  public collection : string = "/requests";
  public headers : Array<string> = ["Fecha", "Correo electrónico", "Nombre"];
  public model : Array<string> = ["date", "email", "username"]

  ngOnInit(): void {
  }

}
