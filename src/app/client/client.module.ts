import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ComponentsModule } from '../components/components.module';

import { InicioComponent } from './inicio/inicio.component';
import { ProfileComponent } from './profile/profile.component';
import { GenresComponent } from './genres/genres.component';
import { NovelComponent } from './novel/novel.component';
import { ChapterComponent } from './chapter/chapter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadComponent } from './upload/upload.component';
import { TermsComponent } from './terms/terms.component';

@NgModule({
  declarations: [
    InicioComponent,
    ProfileComponent,
    GenresComponent,
    NovelComponent,
    ChapterComponent,
    UploadComponent,
    TermsComponent,
    
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class ClientModule { }
