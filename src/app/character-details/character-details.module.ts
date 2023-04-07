import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { CharacterDetailsComponent } from '../character-details/character-details.component'
import { EffectsModule } from '@ngrx/effects'
import { movieReducer } from 'src/app/store/movies/movies.reducer'
import { MovieEffects } from 'src/app/store/movies/movies.effects'
import { StoreModule } from '@ngrx/store';
import { CharactersService } from '../shared/services/character.service';

@NgModule({
  declarations: [
    CharacterDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('movies', movieReducer),
    EffectsModule.forFeature([MovieEffects])
  ],
  providers: [CharactersService],
})

export class CharacterDetailsModule {}
