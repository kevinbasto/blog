import { Component, OnInit } from '@angular/core';
import { TermsService } from 'src/app/core/services/terms/terms.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  constructor(
    private ts: TermsService
  ) {
    this.getTerms();  
  }

  public title : string;
  public content : Array<string>;
  public downloading : boolean = true;

  ngOnInit(): void {
  }

  getTerms(){
    this.ts.getTerms()
    .then((terms : any) => {
      this.title = terms.title;
      this.content = terms.content;
      this.downloading = !this.downloading;
    })
    .catch(error => {
      console.log(error);
      this.title = error;
    });
  }

}
