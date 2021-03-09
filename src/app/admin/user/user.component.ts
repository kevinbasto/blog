import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router : Router,
    private us : UserService
  ) { }

  public uid : string;
  public user : any;
  public editing : boolean = false;
  public uploading : boolean = false;

  public userForm : FormGroup = this.fb.group({
    username: [""],
    email: [""],
    uid: [""],
    role: [null],
    roleId: [null]
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
      this.setUserData();
    })
    .catch(error => {
      console.log(error);
    });
  }

  setUserData(){
    let fields = ["username", "email", "uid", "role", "roleId"];
    for(let field of fields){
      this.userForm.controls[field].setValue(this.user[field]);
    }
    this.disableFields();
  }
  setEditing(){
    this.editing = !this.editing;
    if(this.editing){
      this.enableFields();
    }else{
      this.disableFields();
    }
  }

  disableFields(){
    let fields = ["username", "email", "uid", "role", "roleId"];
    for(let field of fields){
      this.userForm.controls[field].disable();
    } 
  }

  enableFields(){
    let fields = ["username", "role", "roleId"];
    for(let field of fields){
      this.userForm.controls[field].enable();
    } 
  }

  cancel(){
    this.disableFields();
    this.router.navigate(['/admin/usuarios']);
  }

  edit(){
    this.uploading = true;
    this.setEditing();
    let user : any = this.userForm.value;
    user.picture = this.user.picture;
    user.url = `/usuarios/${this.user.uid}`;
    user.id = this.user.id;
    this.us.setData(user)
    .then(response => {
      this.router.navigate(["/admin/usuarios"])
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      this.uploading = false;
    })
  }
}
