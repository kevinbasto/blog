import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NovelService } from 'src/app/core/services/novel/novel.service';
import { StaffService } from 'src/app/core/services/staff/staff.service';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-novel',
  templateUrl: './novel.component.html',
  styleUrls: ['./novel.component.css']
})
export class NovelComponent implements OnInit {

  constructor(
    private router: Router,
    private novelService: NovelService,
    private formbuilder: FormBuilder,
    private userService : AuthService
  ) { }

  // data used for the new title
  public collection : string;
  public title : string;
  public headers : Array<string> = ["id", "título"];
  public model : Array<string> = ["id", "title"]; 

  // data used to work
  public genre : string;
  public novel : string;

  // data used for the form
  public novelForm : FormGroup;
  
  public uploading : boolean;

  ngOnInit() {
    this.getCollectionName();
    this.setNovelForm();
    this.uploading = false;
  }

  getCollectionName() {
    this.genre = this.router.url.split("/")[this.router.url.split("/").length - 2];
    this.novel = this.router.url.split("/")[this.router.url.split("/").length - 1];
    if(this.novel != "new")
      this.loadNovelData();
    else
      this.setNovelTranslator();
  }

    loadNovelData(){
      this.novelService.getNovel(this.genre, this.novel)
      .then(novel => { console.log(novel) })
      .catch(error => {});
    }
  
  setNovelForm() {
    this.novelForm = this.formbuilder.group({
      name : ["", [Validators.required]],
      description : ["", [Validators.required]],
      author: ["", [Validators.required]],
      translator: [{value: "", disabled: true}, [Validators.required]]
    })
  }

  setNovelTranslator() {
    this.userService.user$.subscribe(user => {
      this.novelForm.controls['translator'].setValue(user.username);
    })
  }

  submit(){
    this.uploading = true;
    if(this.novel == "new")
      this.saveNew();
    else
      this.editCurrent();
  }

    private async saveNew() {
      
      let novel = this.novelForm.value;
      this.novelService.create(this.genre, novel, undefined)
      .then(res => this.accepted(res))
      .catch(error => this.rejected(error))
      .finally(() => this.finally());
    }

      private accepted(response : any) {

      }

      private rejected(error : any) {
        console.log(error);
      }

      private finally() {
        this.uploading = !this.uploading;
      }

    private async editCurrent() {

    }
}
