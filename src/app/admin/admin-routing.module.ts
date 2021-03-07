import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UpdatesComponent } from './updates/updates.component';
import { UsersComponent } from './users/users.component';
import { StaffComponent } from './staff/staff.component';


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
    path: 'staff',
    component: StaffComponent
  },
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
