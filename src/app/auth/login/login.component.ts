import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // constructor
  constructor(
    private fb : FormBuilder,
    private router: Router,
    private auth: AuthService
  ) { }

  public loginForm : FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });
  public showMessage: boolean = false;
  public Message : string;
  

  ngOnInit(): void {
  }

  login(){
    let email = this.loginForm.get("email")?.value;
    let password = this.loginForm.get("password")?.value;
    
    this.auth.login(email, password)
    .then(res => {
      this.router.navigate(['client/inicio'])
    })
    .catch(error => {
      let message = this.auth.parseError(error);
      this.Message = message;
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 5000);
    })
  }

  checkError(field : string, type : string){
    return this.loginForm.get(field)?.hasError(type) && this.loginForm.get(field)?.touched;
  }

  checkLength(){
    return this.loginForm.get("password")?.hasError("minlength");
  }
}
