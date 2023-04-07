import { Component, OnDestroy, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable, Subject, Subscription } from 'rxjs'

import { selectMovies } from 'src/app/store/movies/movies.selector'
import { loadMovies } from 'src/app/store/movies/movies.actions'
import { Movie } from '../shared/models/movie.model'

/**
  Component responsible for displaying movie list.
  @implements {OnInit, OnDestroy}
*/

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  movies$: Observable<Movie[]> | undefined
  unsubscribe$ = new Subject<void>();
  subscription: Subscription = new Subscription();
  errorMessage: string;

  constructor(private store: Store) {
    this.errorMessage = '';
    this.movies$ = this.store.pipe(select(selectMovies))
  }
  /**
   * Lifecycle hook that is called after data-bound properties have been
   * initialized. Subscribes to the `movies$` observable and dispatches
   * the `loadMovies` action if the array of movies is empty.
   *
   * @memberof HomeComponent
   */
  ngOnInit() {
    const moviesSubscription = this.movies$?.subscribe(
      (movies) => {
      if (!movies.length) {
        this.store.dispatch(loadMovies())
      }
    }, (error) => {
      this.errorMessage = error;
    })
    this.subscription.add(moviesSubscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
