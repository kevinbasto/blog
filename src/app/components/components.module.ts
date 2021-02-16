import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CoverComponent } from './cover/cover.component';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    CoverComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    CoverComponent,
    CardComponent
  ]
})
export class ComponentsModule { }
