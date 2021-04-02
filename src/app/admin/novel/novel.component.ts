import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NovelService } from 'src/app/core/services/novel/novel.service';
import { StaffService } from 'src/app/core/services/staff/staff.service';

@Component({
  selector: 'app-novel',
  templateUrl: './novel.component.html',
  styleUrls: ['./novel.component.css']
})
export class NovelComponent implements OnInit {

  constructor(
    private router: Router,
    private novelService : NovelService,
    private fb : FormBuilder,
    private staffService : StaffService
  ) {
    
  }

  public novelForm : FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.novelForm = this.fb.group({
      title: [""],
      description: [""],
      author: [""],
      translators: this.fb.array([])
    })

    this.addTranslator();
  }

  addTranslator(){
    let translator : FormGroup = this.fb.group({
      uid: [""]
    })

    this.translators.push(translator);
  }

  removeTranlator(i : number) {
    this.translators.removeAt(i);
  }

  // getters to ease the use of the form
  get title(){
    return this.novelForm.get('title');
  }

  get description(){
    return this.novelForm.get('description');
  }

  get Author(){
    return this.novelForm.get('author');
  }

  get translators(){
    return this.novelForm.get('translators') as FormArray;
  }

}
