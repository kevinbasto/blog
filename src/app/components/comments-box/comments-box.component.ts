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
      this.comments = comments;
      this.lowestId = comments[comments.length -1].id;
      this.loading = !this.loading;
    });
  }

  loadMoreComments(){
    this.loading = true;
    console.log(this.lowestId);
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
    this.cs.postComment(this.comment.get("comment").value)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    })
  }
}
