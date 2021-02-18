import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ComponentsModule } from '../components/components.module';

import { InicioComponent } from './inicio/inicio.component';
import { ProfileComponent } from './profile/profile.component';
import { GenresComponent } from './genres/genres.component';
import { NovelComponent } from './novel/novel.component';

@NgModule({
  declarations: [
    InicioComponent,
    ProfileComponent,
    GenresComponent,
    NovelComponent,
    
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ComponentsModule
  ]
})
export class ClientModule { }
