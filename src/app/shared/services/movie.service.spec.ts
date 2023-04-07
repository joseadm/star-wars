import { TestBed } from '@angular/core/testing'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { MovieService } from 'src/app/shared/services/movie.service'
import { LogService } from '../../core/log.service'
import { Movie } from 'src/app/shared/models/movie.model'
import { mockCompleteMovies } from '../models/movie.model.mock'

describe('MovieService', () => {
  let httpTestingController: HttpTestingController
  let movieService: MovieService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService, LogService],
    })

    httpTestingController = TestBed.inject(HttpTestingController)
    movieService = TestBed.inject(MovieService)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(movieService).toBeTruthy()
  })

  describe('getMovies', () => {
    it('should return an observable array of movies', () => {

      movieService.getMovies().subscribe((movies: Movie[]) => {
        expect(movies).toEqual(mockCompleteMovies)
      })

      const req = httpTestingController.expectOne(
        `${movieService['baseUrl']}/films`,
      )
      expect(req.request.method).toEqual('GET')
      req.flush({
        results: mockCompleteMovies.map((movie: Movie) => ({
          ...movie,
          url: `${movieService['baseUrl']}/films/${movie.id}/`,
        })),
      })
    })
  })

  describe('getMovie', () => {
    it('should return an observable movie with the given id', () => {
      const mockMovie: Movie = {
        id: '1',
        title: 'Star Wars: Episode I - The Phantom Menace',
        director: 'George Lucas',
        episode_id: 0,
        release_date: '',
        producer: '',
        opening_crawl: '',
        characters: [],
        url: '',
      }

      movieService.getMovie(mockMovie.id).subscribe((movie: Movie) => {
        expect(movie).toEqual(mockMovie)
      })

      const req = httpTestingController.expectOne(
        `${movieService['baseUrl']}/films/${mockMovie.id}`,
      )
      expect(req.request.method).toEqual('GET')
      req.flush(mockMovie)
    })
  })
})
