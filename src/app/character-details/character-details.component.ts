import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { selectMovies } from '../store/movies/movies.selector'
import { selectCharacter } from '../store/characters/characters.selector'
import { Character } from '../shared/models/character.model'
import { Movie } from '../shared/models/movie.model'
import { loadMovies } from 'src/app/store/movies/movies.actions'
import { loadCharacter } from 'src/app/store/characters/characters.actions'

/**
  Component responsible for displaying character information and the movie list for the character.
  @implements {OnInit, OnDestroy}
*/

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css'],
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {
  character$: Observable<Character | undefined> | undefined
  characterMovies: Movie[] | undefined
  movies$: Observable<Movie[]> | undefined
  subscription: Subscription = new Subscription();
  errorMessage = "";

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.character$ = this.store.select(selectCharacter(id));
    this.movies$ = this.store.pipe(select(selectMovies));
  }

  /**
   * Lifecycle hook that is called after data-bound properties have been
   * initialized. Subscribes to the `character$` and `movies$` observables to
   * filter the movies list for the character if it exists, otherwise dispatches
   * the `loadCharacter` or `loadMovies` actions.
   *
   * @memberof CharacterDetailsComponent
  */
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    const characterSubscription = this.character$?.subscribe((character) => {
      if (character) {
        this.movies$?.subscribe((movies) => {
          if (movies.length) {
            this.characterMovies = movies.filter((film) => {
              return character.films.includes(film.url)
            })
          } else {
            this.store.dispatch(loadMovies())
          }
        }, error => {
          this.errorMessage = error;
        })
      } else {
        this.store.dispatch(loadCharacter({ id: id ?? '1' }))
      }
    }, error => {
      this.errorMessage = error;
    })

    this.subscription.add(characterSubscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
