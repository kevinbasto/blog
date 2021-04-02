import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private novelService : NovelService,
    private fb : FormBuilder,
    private staffService : StaffService
  ) {
    
  }

  // all the public data of the model
  public genre : string;
  public novel : string;
  public novelForm : FormGroup;
  public data : any;
  public staff : Array<any>;
  public visibleStaff : Array<any>;

  // data relative to the table
  public collection : string;
  public chaptertitle : string = "Capítulos";
  public headers: Array<string> = ["Título"];
  public model : Array<string> = ["title"];

  ngOnInit(): void {
    this.initializeForm();
    this.getNovelAndGenre();
    this.getStaff();
    if(this.novel != "new"){
      this.getData();
    }


  }

  getData() {
    this.novelService.getNovel(this.genre, this.novel)
    .then( (data : any) => {
      this.data = data;
      this.title.setValue(data.title);
      this.description.setValue(data.description);
      this.Author.setValue(data.author);

      for(let translator of data.translators){
        this.addTranslator();
      }

      for(let  i = 0; i < this.translators.length; i++){
        this.translators.controls[i].setValue({uid: this.data.translators[i].uid});
      }
    })
  }

  

  getStaff() {
    this.staffService.getStaff().then(staff => {
      this.staff = staff;
      this.visibleStaff = this.staff;
    })
    .catch(error => {
      console.log(error);
    })
  }

  getNovelAndGenre(){
    this.genre = this.router.url.split("/")[this.router.url.split("/").length - 2];
    this.novel = this.router.url.split("/")[this.router.url.split("/").length - 1];
    this.collection = `/${this.genre}/${this.novel}/chapters`;
  }

  save() {
    this.novelService.editNovel(this.novelForm.value, this.genre, this.novel);
  }

  cancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  initializeForm() {
    this.novelForm = this.fb.group({
      title: [""],
      description: [""],
      author: [""],
      translators: this.fb.array([])
    })

    
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
