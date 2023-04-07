import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { movieReducer } from 'src/app/store/movies/movies.reducer'
import { MovieEffects } from 'src/app/store/movies/movies.effects'
import { StoreModule } from '@ngrx/store';
import { MovieDetailsComponent } from './movie-details.component';
import { MovieService } from '../shared/services/movie.service';
import { LogService } from 'src/app/core/log.service';
import { characterReducer } from '../store/characters/characters.reducer';
import { CharacterEffects } from '../store/characters/characters.effects';

@NgModule({
  declarations: [
    MovieDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('movies', movieReducer),
    StoreModule.forFeature('characters', characterReducer),
    EffectsModule.forFeature([MovieEffects, CharacterEffects])
  ],
  providers: [MovieService, LogService],
})
export class MovieDetailsModule {}
