import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Character } from 'src/app/shared/models/character.model';
import { Movie } from 'src/app/shared/models/movie.model';
import { LogService } from '../../core/log.service';
import { CharactersService } from 'src/app/shared/services/character.service';
import { mockServiceMovies } from 'src/app/shared/models/movie.model.mock';
import { mockCharacters } from 'src/app/shared/models/character.model.mock';

describe('CharactersService', () => {
  let service: CharactersService;
  let httpMock: HttpTestingController;
  let logServiceSpy: jasmine.SpyObj<LogService>;

  beforeEach(() => {
    const logSpy = jasmine.createSpyObj('LogService', ['log']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharactersService, { provide: LogService, useValue: logSpy }],
    });
    service = TestBed.inject(CharactersService);
    httpMock = TestBed.inject(HttpTestingController);
    logServiceSpy = TestBed.inject(LogService) as jasmine.SpyObj<LogService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getFilmsByCharacter', () => {
    it('should return an array of films for a given character', () => {
      const mockCharacter: Character = mockCharacters[2];

      service.getFilmsByCharacter(mockCharacter).subscribe((films: Movie[]) => {
        expect(films).toEqual(mockServiceMovies);
      });

      const filmRequests = httpMock.match((req) =>
        mockCharacter.films.includes(req.url)
      );
      expect(filmRequests.length).toBe(mockCharacter.films.length);

      filmRequests.forEach((req, i) => {
        req.flush(mockServiceMovies[i]);
      });

      expect(logServiceSpy.log).toHaveBeenCalledWith(
        'Films by character loaded succesfully'
      );
    });

    it('should throw an error if no character is provided', () => {
      expect(() => service.getFilmsByCharacter()).toThrowError(
        'Missing character...'
      );
    });
  });
});