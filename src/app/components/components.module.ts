import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CoverComponent } from './cover/cover.component';
import { CardComponent } from './card/card.component';
import { CommentsBoxComponent } from './comments-box/comments-box.component';
import { TableComponent } from './table/table.component';




@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    CoverComponent,
    CardComponent,
    CommentsBoxComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    CoverComponent,
    CardComponent,
    CommentsBoxComponent,
    TableComponent
  ]
})
export class ComponentsModule { }
