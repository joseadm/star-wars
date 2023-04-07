import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { forkJoin, Observable } from 'rxjs'
import { finalize, map } from 'rxjs/operators'

import { Movie } from 'src/app/shared/models/movie.model'
import { Character } from 'src/app/shared/models/character.model'
import { LogService } from '../../core/log.service';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  selectedCharacter: Character | undefined; 
  private readonly baseUrl = 'https://swapi.dev/api'

  constructor(private http: HttpClient, private logger: LogService) {}

  getFilmsByCharacter(character?: Character) {
    if(!character) {
      throw new Error('Missing character...')
    }
    return forkJoin(character.films.map((filmUrl: string) => {
        return this.http.get<Movie>(filmUrl)
          .pipe(film => film,
             finalize(() => this.logger.log('Films by character loaded succesfully')));
      }
    ));
  }

  getCharacter(characterId: string): Observable<Character> {
    return this.http
      .get<Character>(`${this.baseUrl}/people/${characterId}`)
      .pipe(
        (character) => character,
        finalize(() => this.logger.log(`Character ${characterId} loaded succesfully`)),
      )
  }

  getCharactersByFilm(films: string[]): Observable<Character[]> {
    return forkJoin(
      films.map((characterUrl: string) => {
        return this.http.get<Character>(characterUrl).pipe(
          map((character) => ({
            ...character,
            id: character.url.slice(0, -1).split('/').pop() || '1',
          })),
          finalize(() =>
            this.logger.log('Characters by Film loaded succesfully'),
          ),
        )
      }),
    )
  }
}



