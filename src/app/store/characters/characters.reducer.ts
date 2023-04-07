import { createReducer, on } from '@ngrx/store'
import { Character } from 'src/app/shared/models/character.model'
import {
  loadCharacters,
  loadCharacterSuccess,
  loadCharactersSuccess,
  loadCharactersFailure,
} from './characters.actions'

export interface CharacterState {
  characters: Character[]
}

export const initialState: CharacterState = {
  characters: [],
}

export const characterReducer = createReducer(
  initialState,
  on(loadCharacterSuccess, (state, { character }) => ({
    ...state,
    characters: [...state.characters, character],
  })),
  on(loadCharacters, (state) => ({
    ...state,
  })),
  on(loadCharactersSuccess, (state, { characters }) => ({
    ...state,
    characters: [...state.characters, ...characters],
  })),
  on(loadCharactersFailure, (state) => ({
    ...state,
    characters: [],
  })),
)
