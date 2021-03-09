import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  public userForm : FormGroup = this.fb.group({
    username: [""],
    email: [""],
    uid: [""],
    role: [""],
    roleId: [""]
  });

  ngOnInit(): void {
  }

}
