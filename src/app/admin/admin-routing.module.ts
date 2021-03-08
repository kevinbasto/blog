import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UpdatesComponent } from './updates/updates.component';
import { UsersComponent } from './users/users.component';
import { StaffComponent } from './staff/staff.component';
import { NovelsComponent } from './novels/novels.component';
import { PersonalizationComponent } from './personalization/personalization.component';
import { RequestsComponent } from './requests/requests.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio'
  },
  {
    path: 'inicio',
    component: UpdatesComponent
  },
  {
    path: 'usuarios',
    component: UsersComponent
  },
  {
    path: 'usuarios/:user',
    component: UserComponent
  },
  {
    path: 'staff',
    component: StaffComponent
  },
  {
    path: 'personalization',
    component: PersonalizationComponent
  },
  {
    path: 'requests',
    component: RequestsComponent
  },
  {
    path: ':genre',
    component: NovelsComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]

})
export class AdminRoutingModule { }
