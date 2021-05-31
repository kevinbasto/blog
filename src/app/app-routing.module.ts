import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './infraestructure/routes/auth/auth.component';
import { AuthModule } from './infraestructure/routes/auth/auth.module'
import { AdminComponent } from './infraestructure/routes/admin/admin.component';
import { AdminModule } from './infraestructure/routes/admin/admin.module'
import { ClientComponent } from './infraestructure/routes/client/client.component';
import { ClientModule } from './infraestructure/routes/client/client.module';

const routes : Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path : 'auth',
    component: AuthComponent,
    children: [
      {
        path : '',
        loadChildren: './infraestructure/routes/auth/auth.module#AuthModule'
      }
    ]
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
