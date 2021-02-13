import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';

import { InicioComponent } from './inicio/inicio.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    InicioComponent,
    ProfileComponent,
    
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
