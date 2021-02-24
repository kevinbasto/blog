import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentsService } from 'src/app/core/services/comments/comments.service';

@Component({
  selector: 'app-comments-box',
  templateUrl: './comments-box.component.html',
  styleUrls: ['./comments-box.component.css']
})
export class CommentsBoxComponent implements OnInit {

  constructor(
    private cs: CommentsService,
    private fb: FormBuilder
  ) { }

  public loading : boolean;
  public comments : Array<any>;
  public lowestId : number = Infinity;
  public posting : boolean = false;

  public comment : FormGroup = this.fb.group({
    comment: ["", [Validators.required]]
  })

  ngOnInit(): void {
    this.getComments();
  }

  getComments(){
    this.loading = true;
    this.cs.getComments(this.lowestId)
    .then(comments => {
      if(comments.length != 0){
        this.comments = comments;
        this.lowestId = comments[comments.length -1].id;
        this.loading = !this.loading;
      }else{
        this.loading = !this.loading;
        this.lowestId = 0;
      }
    });
  }

  loadMoreComments(){
    this.loading = true;
    this.cs.getComments(this.lowestId)
    .then(comments => {
      for(let comment of comments){
        this.comments.push(comment);
      }
      this.lowestId = comments[comments.length - 1].id;
      this.loading = false;
    });
  }

  submit(){
    this.posting = !this.posting
    this.cs.postComment(this.comment.get("comment").value)
    .then(res => {
      if(this.comments){
        this.comments.push(res);
        this.comments.sort((commentA,commentB) => {
          return (commentA.id - commentB.id)*-1;
        })
        this.posting = !this.posting;
      }else{
        this.comments = []
        this.comments.push(this.comments);
        this.posting = !this.posting;
        this.comments.sort((commentA,commentB) => {
          return (commentA.id - commentB.id) * (-1);
        })
      }
      

    })
    .catch(error => {
      console.log(error);
    })
    this.comment.get("comment").setValue("");
  }
}
