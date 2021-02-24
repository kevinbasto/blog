import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProfileComponent } from './profile/profile.component';
import { GenresComponent } from './genres/genres.component';
import { NovelComponent } from './novel/novel.component';
import { ChapterComponent } from './chapter/chapter.component';
import { UploadComponent } from './upload/upload.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'perfil',
    component: ProfileComponent
  },
  {
    path: 'sube',
    component: UploadComponent
  },
  {
    path: 'terminos',
    component: TermsComponent
  },
  {
    path: ':genre',
    component: GenresComponent
  },
  {
    path: ':genre/:novel',
    component: NovelComponent
  },
  {
    path: ':genre/:novel/:chapter',
    component: ChapterComponent
  }
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
export class ClientRoutingModule { }
