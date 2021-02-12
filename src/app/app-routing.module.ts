import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// routes component and modules
import { AuthModule }  from './auth/auth.module'
import { AuthComponent } from './auth/auth.component';

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
    path: '**',
    redirectTo: "auth"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
