import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'character/:id', component: CharacterDetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
