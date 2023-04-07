import { createReducer, on } from '@ngrx/store'
import { Character } from 'src/app/shared/models/character.model'
import { Movie } from 'src/app/shared/models/movie.model'
import {
  loadMoviesSuccess,
  loadMoviesFailure,
  selectMovie,
  selectMovieSuccess,
  selectMovieFailure,
} from './movies.actions'

export interface MoviesState {
  movies: Movie[]
  selectedFilm: Movie | null
  characters: Character[]
}

export const initialState: MoviesState = {
  movies: [],
  selectedFilm: null,
  characters: [],
}

export const movieReducer = createReducer(
  initialState,
  on(loadMoviesSuccess, (state, { movies }) => ({
    ...state,
    movies,
  })),
  on(loadMoviesFailure, (state) => ({
    ...state,
    movies: [],
  })),
  on(selectMovie, (state) => ({
    ...state,
    selectedFilm: null,
  })),
  on(selectMovieSuccess, (state, { selectedFilm }) => ({
    ...state,
    selectedFilm,
  })),
  on(selectMovieFailure, (state) => ({
    ...state,
    selectedFilm: null,
  })),
)
