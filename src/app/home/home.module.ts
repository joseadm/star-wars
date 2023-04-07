import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { movieReducer } from 'src/app/store/movies/movies.reducer'
import { MovieEffects } from 'src/app/store/movies/movies.effects'
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('movies', movieReducer),
    EffectsModule.forFeature([MovieEffects])
  ],
  providers: [],
})
export class HomeModule {}
