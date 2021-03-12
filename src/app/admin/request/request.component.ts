import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getRequestid();
  }

  getRequestid() {
    let request = this.router.url.substr(1, this.router.url.length - 1);
    request = request.split("/")[request.split("/").length - 1];
    
  }

}
