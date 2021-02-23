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
    email : ["", [Validators.required]],
    profilePicture: [null]
  });
  public error: string;
  public user: User;
  public editing : boolean = false;
  public picture : File;
  public picurl : any;

  ngOnInit(): void {
    this.profileForm.controls["username"].disable();
    this.profileForm.controls["email"].disable();
    this.profileForm.controls["profilePicture"].disable();
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
    this.picurl = user.picture;
    this.profileForm.controls["username"].setValue(user.username);
    this.profileForm.controls["email"].setValue(user.email);
  }

  editData(){
    this.editing = !this.editing;
    this.profileForm.controls["username"].enable();
    this.profileForm.controls["profilePicture"].enable();
  }

  setChanges(){
    this.editing = !this.editing;
    let username = this.profileForm.get("username").value;
    this.ps.editProfile(username, this.picture)
    .then(change => {
      console.log(change);
    })
    .catch(error => {
      console.log(error);
    })
    
  }

  cancel(){
    this.editing = !this.editing;
  }

  uploadFile($event : any){
    this.picture = $event.target.files[0];
    if(this.picture){
      let fr = new FileReader();
      fr.readAsDataURL(this.picture);
      fr.onload = () => {
      this.picurl =  fr.result;
    }
    }
  }
}
