import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NovelService } from 'src/app/core/services/novel/novel.service';

@Component({
  selector: 'app-novel',
  templateUrl: './novel.component.html',
  styleUrls: ['./novel.component.css']
})
export class NovelComponent implements OnInit {

  constructor(
    private router : Router,
    private ns : NovelService,
    private fb : FormBuilder
  ) { }

  public novel : string;
  public content : any;
  public novelForm : FormGroup = this.fb.group({
    title : [""],
    description: [""],
    translators : this.fb.array([]),
    finished: [null]
  })

  ngOnInit(): void {
    this.getRoute();
  }

  getRoute(){
    let genre = this.router.url.split("/")[this.router.url.split("/").length - 2];
    let novel = this.router.url.split("/")[this.router.url.split("/").length - 1];
    if(novel == "new")
      this.createNovel();
    else
      this.getNovel(genre, novel);
  }

  createNovel(){
    this.novel = "Crear Novela";
  }

  getNovel(genre : string, novel : string){
    this.ns.getNovel(genre, novel)
    .then(novel => {
      this.content = novel;
      console.log(this.content);
      this.novel = this.content.title;
      this.setData();
    })
    .catch(error => {
      console.log(error);
    });
  }

  setData(){
    let controls = ["title", "description"];
    for(let control of controls){
      this.novelForm.controls[control].setValue(this.content[control]);
    }

    for(let translator of this.content.translators){
      this.addTranslator(translator.uid, translator.username);
      
    }
  }

  get translatorForms(){
    return this.novelForm.get('translators') as FormArray;
  }

  addTranslator(uid : string, username : string){
    let translator = this.fb.group({
      uid: [null, Validators.required]
    })

    this.translatorForms.push(translator);
  }

  deleteTranslator(i : number){
    this.translatorForms.removeAt(i);
  }
}
