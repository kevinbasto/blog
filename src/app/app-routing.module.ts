import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// routes component and modules
import { AuthModule }  from './auth/auth.module'
import { AuthComponent } from './auth/auth.component';
import { ClientComponent } from './client/client.component';
import { ClientModule } from './client/client.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: './auth/auth.module#AuthModule'
      }
    ]
  },
  {
    path: 'client',
    component: ClientComponent,
    children: [
      {
        path: '',
        loadChildren: './client/client.module#ClientModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: "auth"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
