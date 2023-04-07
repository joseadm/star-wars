import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Movie } from '../shared/models/movie.model';
import { MovieDetailsComponent } from './movie-details.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { selectMovies } from 'src/app/store/movies/movies.selector';
import { loadCharacters } from '../store/characters/characters.actions';
import { Character } from '../shared/models/character.model';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let store: MockStore;
  let mockMoviesSelector: MemoizedSelector<object, Movie[]>;
  let mockCharactersSelector: MemoizedSelector<object, Character[]>;

  const mockMovies: Movie[] = [
    { id: '1', episode_id: 1, title: 'Movie 1', release_date: '2000-05-05', director: 'George Lucas', producer: 'Rick McCallum', opening_crawl: 'Lorem ipsu', characters: ['https://swapi.dev/api/people/1/'], url: 'test.com' },
    { id: '2', episode_id: 2, title: 'Movie 1', release_date: '2000-05-05', director: 'George Lucas', producer: 'Rick McCallum', opening_crawl: 'Lorem ipsu', characters: [], url: 'test.com' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule, RouterTestingModule],
      declarations: [MovieDetailsComponent],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    mockMoviesSelector = store.overrideSelector(selectMovies, mockMovies);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadCharacters action on ngOnInit', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadCharacters({ film: mockMovies[0] }));
  });
});
