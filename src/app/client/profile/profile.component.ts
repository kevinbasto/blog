import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private fb : FormBuilder
  ) { }

  public profileForm : FormGroup = this.fb.group({
    username : ["", [Validators.required]],
    email : ["", [Validators.required]]
  });

  ngOnInit(): void {
    this.profileForm.controls["username"].disable();
    this.profileForm.controls["email"].disable();
  }
}
