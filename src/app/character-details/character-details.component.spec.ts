import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Character } from '../shared/models/character.model';
import { selectCharacters } from '../store/characters/characters.selector';
import { CharacterDetailsComponent } from './character-details.component';
import { mockCharacters } from '../shared/models/character.model.mock';

describe('CharacterDetailsComponent', () => {
  let component: CharacterDetailsComponent;
  let fixture: ComponentFixture<CharacterDetailsComponent>;
  let store: MockStore;
  let mockCharacterSelector: MemoizedSelector<object, Character[]>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule, RouterTestingModule],
      declarations: [CharacterDetailsComponent],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    mockCharacterSelector = store.overrideSelector(selectCharacters, mockCharacters);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
