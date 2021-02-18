import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CoverComponent } from './cover/cover.component';
import { CardComponent } from './card/card.component';
import { CommentsBoxComponent } from './comments-box/comments-box.component';



@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    CoverComponent,
    CardComponent,
    CommentsBoxComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    CoverComponent,
    CardComponent,
    CommentsBoxComponent
  ]
})
export class ComponentsModule { }
