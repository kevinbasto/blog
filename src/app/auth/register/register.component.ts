import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  public registerForm : FormGroup = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(2)]],
    email : ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    verifyPassword: ["", [Validators.required, Validators.minLength(6)]],
    terms: ["", [Validators.required]]
  });

  ngOnInit(): void {

  }

  register(){
    
  }

  checkError(field : string, type : string){
    return this.registerForm.get(field)?.hasError(type) && this.registerForm.get(field)?.touched;
  }

  verifyPassword(){
    let test =  (this.registerForm.get("password")?.value == this.registerForm.get("verifyPassword")?.value) && (this.registerForm.get("password")?.touched || this.registerForm.get("verifyPassword")?.touched);
    return test;
  }
}
