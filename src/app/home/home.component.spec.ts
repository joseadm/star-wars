import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';

import { HomeComponent } from './home.component';
import { selectMovies } from 'src/app/store/movies/movies.selector';
import { Movie } from '../shared/models/movie.model';
import { loadMovies } from 'src/app/store/movies/movies.actions';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { mockMovies } from '../shared/models/movie.model.mock';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore;
  let mockMoviesSelector: MemoizedSelector<object, Movie[]>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule, RouterTestingModule],
      declarations: [HomeComponent],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    mockMoviesSelector = store.overrideSelector(selectMovies, mockMovies);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies if movies$ is empty', () => {
    mockMoviesSelector.setResult([]);
    store.refreshState();
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadMovies());
  })

  it('should not dispatch loadMovies action if movies already exist', () => {
    mockMoviesSelector.setResult(mockMovies);
    store.refreshState();
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).not.toHaveBeenCalled();
  });
})