import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Movie } from '../shared/models/movie.model'
import { selectMovies } from 'src/app/store/movies/movies.selector'
import {
  selectCharacters,
} from 'src/app/store/characters/characters.selector'
import {
  loadCharacters,
} from 'src/app/store/characters/characters.actions'

import { select, Store } from '@ngrx/store'
import { Character } from '../shared/models/character.model'
import { Observable, Subscription } from 'rxjs'
import { loadMovies } from '../store/movies/movies.actions'

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})

/**
  Component responsible for displaying movie details and its characters.
  @implements {OnInit, OnDestroy}
*/

export class MovieDetailsComponent implements OnInit, OnDestroy {
  movie: Movie | undefined
  characters$: Observable<Character[]> | undefined
  filmCharacters: Character[] | undefined
  movies$: Observable<Movie[]> | undefined
  subscriptions: Subscription = new Subscription();
  errorMessage = "";

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {
    this.characters$ = this.store.pipe(select(selectCharacters))
    this.movies$ = this.store.pipe(select(selectMovies))
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    const charactersSubscription = this.characters$?.subscribe((characters) => {
      if (characters.length > 0 && this.movie) {
        this.filmCharacters = characters.filter((character) =>
          this.movie?.characters.includes(character.url),
        )
      }
    }, (error) => {
      this.errorMessage = error;
    })

    const moviesSubscription =this.movies$?.subscribe((movies) => {
      if (movies.length > 0) {
        this.movie = movies.find((movie) => movie.id === id)
        this.store.dispatch(
          loadCharacters({ film: this.movie ? this.movie : movies[0] }),
        )
      } else {
        this.store.dispatch(loadMovies())
      }
    }, (error) => {
      this.errorMessage = error;
    })

    this.subscriptions.add(charactersSubscription);
    this.subscriptions.add(moviesSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
