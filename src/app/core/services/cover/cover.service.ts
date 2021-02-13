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
    tokens = tokens.filter(token => {
      if( token != "" && token != "client" && token != "admin"){
        return token;
      }
    });
    for(let token of tokens){
      title += token + "/";
    }
    title = title.substr(0, title.length-1);
    title = title.toUpperCase();
    return title;
  }
}
