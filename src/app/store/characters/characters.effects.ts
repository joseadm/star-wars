import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { CharactersService } from 'src/app/shared/services/character.service';
import { loadCharacters, loadCharacter } from 'src/app/store/characters/characters.actions';
import { selectCharacters } from './characters.selector';

@Injectable()
export class CharacterEffects {
  constructor(private actions$: Actions, private characterService: CharactersService, private store: Store) {}

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCharacters),
      withLatestFrom(this.store.select(selectCharacters)),
      mergeMap(([action, characters]) => {
        let filteredItems = action.film.characters;
        if(characters.length > 0) {
           filteredItems = action.film.characters.filter(characterUrl => !characters.some(el => el['url'] === characterUrl));
        }
        return this.characterService.getCharactersByFilm(filteredItems).pipe(
          map((characters) => {
            return { type: '[Movie] Load Characters Success', characters };
          }),
          catchError(() => of({ type: '[Movie] Load Characters Failure' }))
        )
        })
    )
  );

  loadCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCharacter),
      mergeMap((action) => {
        return this.characterService.getCharacter(action.id).pipe(
          map((character) => {
            return { type: '[Movie] Load Character Success', character };
          }),
          catchError(() => of({ type: '[Movie] Load Character Failure' }))
        )
        })
    )
  );
}
