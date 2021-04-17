import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private af: AngularFirestore
  ) { }

  public background : string;

  ngOnInit(): void {
    this.af.doc('/info/background')
    .valueChanges()
    .pipe(take(1))
    .toPromise()
    .then((background : any) => {
      this.background = background.background;
    })
  }

}
