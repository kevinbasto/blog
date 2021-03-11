import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// routes component and modules
import { AuthModule }  from './auth/auth.module'
import { AuthComponent } from './auth/auth.component';
import { ClientComponent } from './client/client.component';
import { ClientModule } from './client/client.module';
import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';
import { AuthGuard } from './core/guards/auth/auth.guard';

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
    ],
    canActivateChild: [ AuthGuard ]
  },
  {
    path: 'client',
    component: ClientComponent,
    children: [
      {
        path: '',
        loadChildren: './client/client.module#ClientModule'
      }
    ],
    canActivateChild: [ AuthGuard ]
  },
  {
    path: 'admin',
    component : AdminComponent,
    children: [
      {
        path: '',
        loadChildren: './admin/admin.module#AdminModule'
      }
    ],
    canActivateChild: [ AuthGuard ]
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
