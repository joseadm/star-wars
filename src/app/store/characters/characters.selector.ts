import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharacterState } from './characters.reducer';

export const selectCharacterState = createFeatureSelector<CharacterState>('characters');

export const selectCharacters = createSelector(
  selectCharacterState,
  (state) => Object.values(state.characters)
);

export const selectFilmCharacters = (filmUrls: string[]) => createSelector(
  selectCharacterState,
  (state) => {
    return Object.values(state.characters.filter(character => filmUrls.includes(character.url)))
  }
);

export const selectCharacter = (id: string | null) => createSelector(selectCharacterState,
  (state) => state.characters.find(character => character.id === id) || undefined
);