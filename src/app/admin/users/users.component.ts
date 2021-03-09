import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor() { }

  public collection : string = "/users";
  public title : string = "Usuarios";
  public headers : Array<string> = ["Id", "Usuario", "Email", "Nivel"];
  public model : Array<string> = ["id", "username", "email", "roleId"];

  ngOnInit(): void {
  }

}
