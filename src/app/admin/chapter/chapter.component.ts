import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChapterService } from 'src/app/core/services/chapter/chapter.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  constructor(
    private formBuilder     : FormBuilder,
    private chapterService  : ChapterService,
    private authService     : AuthService,
    private router          : Router
  ) { }

  // form for the chapter
  public chapterForm : FormGroup = this.formBuilder.group({
    title : ["", Validators.required],
    content : ["" , Validators.required]
  });

  // title of the chapter
  public title : string;
  public uploading : boolean = false;

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation() {
    if(this.chapter == "new"){
      this.title = "Capítulo Nuevo"
    }else{
      this.getChapter();  
    }
  }

  getChapter() {
    this.chapterService.getAdminChapter(this.genre, this.novel, this.chapter)
    .then(chapter => {
      console.log(chapter);
    })
    .catch(error => {

    });
  }

  cancel() {
    this.router.navigate([`/admin/${this.genre}/${this.chapter}`]);
  }

  submit() {
    this.uploading = !this.uploading;
    if(this.chapter == "new"){
      this.saveNew();
    }else{
      this.saveEdit();
    }
  }

  async saveNew() {
    let chapter = this.chapterForm.value

    let title = chapter.title;
    let content : Array<string> = chapter.content.split("\n");
    content = content.filter(paragraph => {
      if(paragraph != "")
        return paragraph;
    })
    let translator;
    await this.user.pipe(take(1))
    .toPromise()
    .then(user => {
      translator = user.uid
    })
    
    chapter = {
      title : title,
      content : content,
      translators: [
        { uid : translator }
      ],
      
    }

    this.chapterService.saveNew(this.genre, this.novel, chapter)
    .then(res => {
      this.router.navigate([`/admin/${this.genre}/${this.novel}`]);
    })
    .catch(error => {

    })
    .finally(() => {
      this.uploading = !this.uploading;
    });    

  }

  async saveEdit() {
    console.log("saving existing");
  }

  //getters
  get genre() {
    let chapter : string  = this.url.split("/")[this.url.split("/").length - 3];
    return chapter;
  }

  get novel() {
    let chapter : string  = this.url.split("/")[this.url.split("/").length - 2];
    return chapter;
  }

  get chapter() {
    let chapter : string  = this.url.split("/")[this.url.split("/").length - 1];
    return chapter;
  }

  get url(){
    return this.router.url;
  }

  get user(){
    return this.authService.user$;
  }
}
