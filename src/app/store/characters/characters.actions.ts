import { createAction, props } from '@ngrx/store';
import { Character } from 'src/app/shared/models/character.model';
import { Movie } from 'src/app/shared/models/movie.model';

export const loadCharacter = createAction('[Movie] Load Character', props<{ id: string }>());
export const loadCharacterSuccess = createAction('[Movie] Load Character', props<{ character: Character }>());

export const loadCharacters = createAction('[Movie] Load Characters', props<{ film: Movie }>());
export const loadCharactersSuccess = createAction('[Movie] Load Characters Success', props<{ characters: Character[] }>());
export const loadCharactersFailure = createAction('[Movie] Load Characters Failure');

