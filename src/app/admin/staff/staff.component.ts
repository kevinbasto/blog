import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  constructor() { }

  public collection : string = "/staff";
  public title : string = "Staff de la página";
  public headers = ["id", "usuario", "Correo electrónico"];
  public model = ["id", "username", "email"]

  ngOnInit(): void {
  }


}
