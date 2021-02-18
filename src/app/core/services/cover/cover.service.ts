import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoverService {

  constructor( ) { }

  getTitle(url: string) : string{
    let title : string = "";
    let tokens = url.split("/");
    title = tokens[2];
    title = title.toUpperCase();
    return title;
  }
}
