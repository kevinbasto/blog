import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ThemifyService } from '../../core/services/themify/themify.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  // constructor
  constructor(
    private themify : ThemifyService,
    private auth : AuthService
  ) { }

  @Input() title : any;
  @Input() menu : any;
  @Output() closed = new EventEmitter<boolean>();
  public theme : string = this.themify.theme;
  public level : number;

  ngOnInit(): void {
    this.auth.user$.pipe(take(1))
    .toPromise()
    .then(user => {
      this.level = user.roleId;
    })
    .catch(error => {
      console.log(error);
    })
  }

  alternate(){
    this.closed.emit(false);
  }

  changeTheme(){
    this.themify.changeTheme();
    this.theme = this.themify.theme;
  }

}
