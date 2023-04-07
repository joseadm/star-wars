import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MoviesState } from 'src/app/store/movies/movies.reducer';

export const selectMovieState = createFeatureSelector<MoviesState>('movies');

export const selectMovies = createSelector(
  selectMovieState,
  (state) => Object.values(state.movies)
);

export const selectCharacters = createSelector(
  selectMovieState,
  (state) => Object.values(state.characters)
);

export const selectMovie = (id: string | null) => createSelector(selectMovieState,
  (state) => state.movies.find(movie => movie.id === id) || null
);
