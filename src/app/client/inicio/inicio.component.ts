import { Component, OnInit } from '@angular/core';
import { UpdatesService } from '../../core/services/updates/updates.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private us : UpdatesService
  ) { }

  public updates : Array<any>;

  ngOnInit(): void {
    this.retrieveData();
  }

  retrieveData(){
    this.us.retrieveData().then(res => {
      this.updates = res;
    })
    .catch(error => {
      console.error(error);
    })
  }
}
