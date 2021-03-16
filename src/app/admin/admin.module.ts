import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsModule } from '../components/components.module';
import { UpdatesComponent } from './updates/updates.component';
import { UsersComponent } from './users/users.component';
import { StaffComponent } from './staff/staff.component';
import { NovelsComponent } from './novels/novels.component';
import { PersonalizationComponent } from './personalization/personalization.component';
import { RequestsComponent } from './requests/requests.component';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestComponent } from './request/request.component';
import { NovelComponent } from './novel/novel.component';



@NgModule({
  declarations: [
    UpdatesComponent,
    UsersComponent,
    StaffComponent,
    NovelsComponent,
    PersonalizationComponent,
    RequestsComponent,
    UserComponent,
    RequestComponent,
    NovelComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
