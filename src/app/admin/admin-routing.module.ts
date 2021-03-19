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
import { LevelGuard } from '../core/guards/level/level.guard';
import { RequestComponent } from './request/request.component';
import { NovelComponent } from '../admin/novel/novel.component';



const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'inicio'
  // },
  {
    path: 'inicio',
    component: UpdatesComponent,
    canActivate: [ LevelGuard ]
  },
  {
    path: 'usuarios',
    component: UsersComponent,
    canActivate: [ LevelGuard ]
  },
  {
    path: 'usuarios/:user',
    component: UserComponent,
    canActivate: [ LevelGuard ]
  },
  {
    path: 'staff',
    component: StaffComponent,
    canActivate: [ LevelGuard ]
  },
  {
    path: 'personalization',
    component: PersonalizationComponent,
    canActivate: [ LevelGuard ]
  },
  {
    path: 'requests',
    component: RequestsComponent,
    canActivate: [ LevelGuard ]
  },
  {
    path: 'requests/:request',
    component: RequestComponent,
    canActivate: [ LevelGuard ]
  },
  {
    path: ':genre',
    component: NovelsComponent,
    canActivate: [ LevelGuard ]
  },
  {
    path: ':genre/:novel',
    component: NovelComponent,
    canActivate: [ LevelGuard ]
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
