import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/core/services/request/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(
    private router : Router,
    private rs : RequestService,
    private fb : FormBuilder
  ) { }

  public id : string
  public request  : any;
  public requestForm : FormGroup = this.fb.group({
    date : [""],
    email : [""],
    genres: [""],
    name: [""],
    reason : [""]
  });
  public accepted : boolean = false;
  public posting : boolean = false;

  ngOnInit(): void {
    this.getRequestid();
  }

  getRequestid() {
    let request = this.router.url.substr(1, this.router.url.length - 1);
    request = request.split("/")[request.split("/").length - 1];
    this.id = request;
    this.getRequest();
  }

  getRequest() {
    this.rs.getRequest(this.id)
    .then(request => {
      console.log(request);
      this.request = request;
      this.setData();
    })
    .catch(error => {
      console.log(error);
    })
  }

  setData(){
    let fields = ["date", "email", "genres", "name", "reason"]
    for(let field of fields){
      this.requestForm.controls[field].disable();
      this.requestForm.controls[field].setValue(this.request[field]);
    }
  }

  setAccepted(accepted: boolean){
    this.posting = true;
    this.accepted = accepted;

    if(accepted){
      this.rs.accept(this.id)
      .then(result => {
        this.posting = false;
        this.router.navigate(['/admin/requests']);
      })
    }else{
      this.rs.deny(this.id)
      .then(res => {
        this.posting = false;
        this.router.navigate(['/admin/requests']);
      })
    }
  }

}
