import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './infraestructure/routes/admin/admin.component';
import { AuthComponent } from './infraestructure/routes/auth/auth.component';
import { ClientComponent } from './infraestructure/routes/client/client.component';

const routes : Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path : 'auth',
    component: AuthComponent
  },
  {
    path : 'client',
    component: ClientComponent
  },
  {
    path : 'admin',
    component: AdminComponent
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
