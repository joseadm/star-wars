import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HomeComponent } from '../home/home.component'
import { CharacterDetailsComponent } from '../character-details/character-details.component'
import { MovieDetailsComponent } from '../movie-details/movie-details.component'

import { EffectsModule } from '@ngrx/effects'
import { movieReducer } from 'src/app/store/movies/movies.reducer'
import { MovieEffects } from 'src/app/store/movies/movies.effects'

import { StoreModule } from '@ngrx/store';
import { MovieService } from './services/movie.service';
import { LogService } from 'src/app/core/log.service';

@NgModule({
  declarations: [
    HomeComponent,
    CharacterDetailsComponent,
    MovieDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('movies', movieReducer),
    EffectsModule.forFeature([MovieEffects])
  ],
  providers: [MovieService, LogService],
  exports: [HomeComponent, CharacterDetailsComponent, MovieDetailsComponent],
})
export class SharedModule {}
