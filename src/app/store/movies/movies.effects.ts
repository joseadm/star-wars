import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MovieService } from 'src/app/shared/services/movie.service';
import { loadMovies, selectMovie } from 'src/app/store/movies/movies.actions';

@Injectable()
export class MovieEffects {
  constructor(private actions$: Actions, private movieService: MovieService) {}

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMovies),
      mergeMap(() =>
        this.movieService.getMovies().pipe(
          map((movies) => {
            return { type: '[Movie] Load Movies Success', movies };
          }),
          catchError(() => of({ type: '[Movie] Load Movies Failure' }))
        )
      )
    )
  );

  selectMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectMovie),
      mergeMap((action) =>
        this.movieService.getMovie(action.movieId).pipe(
          map((selectedFilm) => {
            return { type: '[Movie] Select Movie Success', selectedFilm };
          }),
          catchError(() => of({ type: '[Movie] Select Movie Failure' }))
        )
      )
    )
  );
}
