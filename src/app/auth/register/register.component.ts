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
    username: ["", [Validators.required]],
    email : ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    verifyPassword: ["", [Validators.required, Validators.minLength(6)]],
    terms: [false, [Validators.required]]
  });

  ngOnInit(): void {

  }

  verifyPassword(){
    return this.registerForm.get("password")?.value == this.registerForm.get("verifyPassword")?.value;
  }

  register(){
    console.log(this.registerForm.value);
  }

}
