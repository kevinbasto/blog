import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { TablesComponent } from './tables/tables.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'updates'
  },
  {
    path : 'updates',
    component: LandingComponent
  },
  {
    path: ':table',
    component: TablesComponent
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
