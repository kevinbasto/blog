import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route : ActivatedRoute,
    private us : UserService
  ) { }

  public uid : string;
  public user : any;

  public userForm : FormGroup = this.fb.group({
    username: [""],
    email: [""],
    uid: [""],
    role: [""],
    roleId: [""]
  });

  ngOnInit(): void {
    this.setUserUid();
  }

  setUserUid(){
    this.route.params.subscribe(params => {
      this.uid = params.user;
      this.getData();  
    })
  }

  async getData(){
    await this.us.getData(this.uid)
    .then(user => {
      this.user = user;
    })
    .catch(error => {
      console.log(error);
    });
  }

}
