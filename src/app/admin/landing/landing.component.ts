import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/core/services/activity/activity.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(
    private as: ActivityService
  ) { }

  // all the data that is going to be exported
  public title: string;
  public headers: Array<string>;
  public model: Array<string>;

  // pool and page
  public data: Array<any>;
  public pageData: Array<any>;

  // all the internal management controls
  public maxPage: number;
  public page: number;
  public lowestId: number;
  public highestId: number;
  public pageSize: number;


  ngOnInit(): void {
    this.setBasicData();
  }

  // sets the basic data that is going to be sended to the table
  setBasicData() {
    // data for the table
    this.title = "Registro de actividad";
    this.headers = ["Id", "título", "fecha"]
    this.model = ["id", "title", "date"];
    this.data = [];
    this.pageData = [];

    // data for the controls
    this.maxPage = 1;
    this.pageSize = 5;
    this.page = 1;

    // this is for control of the pageloc
    this.lowestId = Infinity;
    this.highestId = 0;
    this.getPage(true);
  }

  nextPage() {
    this.page++;
    this.getPage(true);
  }

  previousPage() {
    this.page--;
    this.getPage(false);
  }

  async getPage(forward: boolean) {
    // si el paginado avanza a la página siguiente
    if (forward) {
      let totalPages = this.data.length / this.pageSize;
      if (totalPages == this.maxPage) {
        // the buffer does contain the next page
        this.pageData = [];
        for (let record of this.data) {
          if ((record.id < this.lowestId) && (record.id > (this.lowestId - this.pageSize))) {
            this.pageData.push(record);
          }
        }

        this.lowestId = this.pageData[this.pageData.length - 1].id;
        this.highestId = this.pageData[0].id;
      } else {
        // the buffer doesn't contain the next page
        this.download()
          .then(collection => {
            this.pageData = [];
            collection.map(update => this.data.push(update))
            this.pageData = collection;
            this.lowestId = this.pageData[this.pageData.length - 1].id;
            this.highestId = this.pageData[0].id;
          })
      }
    }
    // si el paginado retrocede
    else {
      this.pageData = []
      for (let record of this.data) {
        if ((record.id > this.highestId) && (record.id <= (this.highestId + this.pageSize))) {
          this.pageData.push(record);
        }
      }
      this.lowestId = this.pageData[this.pageData.length - 1].id;
      this.highestId = this.pageData[0].id;
    }
  }

  download(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.as.getActivityLog(this.lowestId, this.pageSize)
        .then(updates => {
          if (this.lowestId == Infinity) {
            this.calculateMaxPage(updates[0].id);
          }
          resolve(updates)
        })
        .catch(error => { reject(error) });
    });
  }

  calculateMaxPage(highestId: number) {
    this.maxPage = Math.ceil(highestId / this.pageSize);
  }
}