import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from 'src/app/core/services/upload/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(
    private fb : FormBuilder,
    private us: UploadService
  ) { }

  public uploadForm : FormGroup = this.fb.group({
    name : ["", [Validators.required]],
    reason : ["", [Validators.required]],
    genres : ["", [Validators.required]],
    terms : [null, [Validators.required]]
  });
  public message : string;
  public uploading : boolean = false;

  ngOnInit(): void {
  }

  submit(){
    this.uploading = !this.uploading;
    let fields = ["name", "reason", "genres"];
    let form : any = {};

    for(let field of fields){
      form[field] = this.uploadForm.get(field).value;
    }

    this.us.submit(form.name, form.reason, form.genres)
    .then(res => {
      this.message = "Hemos recibido tu solicitud, ¡Nos comunicaremos contigo apenas podamos!";
      this.uploading = false;
    })
    .catch(error => {
      this.message = "Hubo un problema a la hora de subir tu solicitud :(";
    })
  }

}
