import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // constructor
  constructor(
    private fb : FormBuilder
  ) { }

  public loginForm : FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]]
  })

  ngOnInit(): void {
  }

  submit(){
    console.log(this.loginForm.value);
  }

  checkError(field : string, type : string){
    return this.loginForm.get(field)?.hasError(type) && this.loginForm.get(field)?.touched;
  }

  checkLength(){
    return this.loginForm.get("password")?.hasError("minlength");
  }
}
