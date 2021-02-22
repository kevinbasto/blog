import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/interfaces/user';
import { ProfileService } from 'src/app/core/services/profile/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private fb : FormBuilder,
    private ps : ProfileService
  ) { }

  public profileForm : FormGroup = this.fb.group({
    username : ["", [Validators.required]],
    email : ["", [Validators.required]]
  });
  public error: string;
  public user: User;
  public editing : boolean = false;

  ngOnInit(): void {
    this.profileForm.controls["username"].disable();
    this.profileForm.controls["email"].disable();
    this.getProfile();
  }

  getProfile(){
    this.ps.getProfile()
    .then((user : User) => {
      this.setProfileData(user);
    })
    .catch(error => {
      this.error = error;
    });
  }

  setProfileData(user : User){
    this.user = user;
    this.profileForm.controls["username"].setValue(user.username);
    this.profileForm.controls["email"].setValue(user.email);
  }

  editData(){
    this.editing = !this.editing;
    if(this.editing){
      this.profileForm.controls["username"].enable();
      this.profileForm.controls["email"].enable();
    }else{
      this.profileForm.controls["username"].disable();
      this.profileForm.controls["email"].disable();
    }
  }
}
