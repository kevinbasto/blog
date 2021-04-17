import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { PersonalizatiionService } from 'src/app/core/services/personalizatiion.service';

@Component({
  selector: 'app-personalization',
  templateUrl: './personalization.component.html',
  styleUrls: ['./personalization.component.css']
})
export class PersonalizationComponent implements OnInit {

  constructor(
    private PersonalizatiionService : PersonalizatiionService,
    private angularFirestore : AngularFirestore
  ) { }

  public cover : File;
  public coverUrl : any;

  ngOnInit(): void {
    this.angularFirestore.doc("info/cover").valueChanges().pipe(take(1))
    .toPromise()
    .then( (cover : any) => { 
      this.coverUrl = cover.cover;
    })
  }

  uploadCover($event : any){
    this.cover = $event.target.files[0];
    if(this.cover){
      let fr = new FileReader();
      fr.readAsDataURL(this.cover);
      fr.onload = () => {
        this.coverUrl = fr.result;
      }
    }
  }

  changeCover(){
    this.PersonalizatiionService.uploadCover(this.cover);
  }

}
