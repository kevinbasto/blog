import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsModule } from '../components/components.module';
import { UpdatesComponent } from './updates/updates.component';
import { UsersComponent } from './users/users.component';
import { StaffComponent } from './staff/staff.component';
import { NovelsComponent } from './novels/novels.component';



@NgModule({
  declarations: [
    UpdatesComponent,
    UsersComponent,
    StaffComponent,
    NovelsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule
  ]
})
export class AdminModule { }
