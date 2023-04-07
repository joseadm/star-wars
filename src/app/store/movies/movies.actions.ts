import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/shared/models/movie.model';

export const loadMovies = createAction('[Movie] Load Movies');
export const loadMoviesSuccess = createAction('[Movie] Load Movies Success', props<{ movies: Movie[] }>());
export const loadMoviesFailure = createAction('[Movie] Load Movies Failure');

export const selectMovie = createAction('[Movie] Select Movie', props<{ movieId: string }>());
export const selectMovieSuccess = createAction('[Movie] Select Movie Success', props<{ selectedFilm: Movie }>());
export const selectMovieFailure = createAction('[Movie] Select Movie Failure');
