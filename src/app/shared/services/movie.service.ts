import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Movie } from 'src/app/shared/models/movie.model'
import { finalize, map } from 'rxjs/operators'
import { LogService } from '../../core/log.service'

@Injectable()
export class MovieService {
  private readonly baseUrl = 'https://swapi.dev/api'
  constructor(private http: HttpClient, private logger: LogService) {}

  getMovies(): Observable<Movie[]> {
    const options = {
      params: {},
    }
    return this.http.get<Movie[]>(`${this.baseUrl}/films`, options).pipe(
      map((films: any) => {
        return films.results.map((film: Movie) => ({
          ...film,
          id: film.url.slice(0, -1).split('/').pop(),
        }))
      }),
      finalize(() => this.logger.log('Movies loaded succesfully')),
    )
  }

  getMovie(movieId: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/films/${movieId}`).pipe(
      (film) => film,
      finalize(() => this.logger.log('Movie loaded succesfully')),
    )
  }
}
