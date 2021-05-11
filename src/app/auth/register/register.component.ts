import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) { }

  public registerForm : FormGroup = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(2)]],
    email : ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    verifyPassword: ["", [Validators.required, Validators.minLength(6)]],
    terms: ["", [Validators.required]]
  });
  public Message : string = "";
  public showMessage : boolean = false;
  public loading : boolean = false;

  ngOnInit(): void {

  }

  register(){
    this.loading = true;
    let fields = ["username", "email", "password"];
    let request : any = {};

    for(let field of fields){
      request[field] = this.registerForm.get(field)?.value
    }

    this.auth.register(request.username, request.email, request.password)
    .then(res =>{
      this.router.navigate(['client/inicio']);
    })
    .catch(error => {
      let message = this.auth.parseError(error);
      this.Message = message;
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 5000);
    })
    .finally(()=> {
      this.loading = false;
    });
  }

  checkError(field : string, type : string){
    return this.registerForm.get(field)?.hasError(type) && this.registerForm.get(field)?.touched;
  }

  verifyPassword(){
    let test =  (this.registerForm.get("password")?.value == this.registerForm.get("verifyPassword")?.value) && (this.registerForm.get("password")?.touched || this.registerForm.get("verifyPassword")?.touched);
    return test;
  }
}
