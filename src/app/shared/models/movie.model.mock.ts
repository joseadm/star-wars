import { Movie } from './movie.model'

export const mockMovies: Movie[] = [
  {
    id: '1',
    episode_id: 1,
    title: 'Movie 1',
    release_date: '2000-05-05',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    opening_crawl: 'Lorem ipsu',
    characters: ['https://swapi.dev/api/people/1/'],
    url: 'test.com',
  },
  {
    id: '2',
    episode_id: 2,
    title: 'Movie 1',
    release_date: '2000-05-05',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    opening_crawl: 'Lorem ipsu',
    characters: [],
    url: 'test.com',
  },
]

export const mockServiceMovies: Movie[] = [
  {
    id: '1',
    episode_id: 1,
    title: 'Movie 1',
    release_date: '2000-05-05',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    opening_crawl: 'Lorem ipsu',
    characters: ['https://swapi.dev/api/people/1/'],
    url: 'test.com',
  },
  {
    id: '2',
    episode_id: 2,
    title: 'Movie 1',
    release_date: '2000-05-05',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    opening_crawl: 'Lorem ipsu',
    characters: [],
    url: 'test.com',
  },
]

export const mockCompleteMovies: Movie[] = [
  {
    id: '1',
    title: 'Star Wars: Episode I - The Phantom Menace',
    director: 'George Lucas',
    episode_id: 0,
    release_date: '',
    producer: '',
    opening_crawl: '',
    characters: [],
    url: 'https://swapi.dev/api/films/1/',
  },
  {
    id: '2',
    title: 'Star Wars: Episode I - The Phantom Menace',
    director: 'George Lucas',
    episode_id: 0,
    release_date: '',
    producer: '',
    opening_crawl: '',
    characters: [],
    url: 'https://swapi.dev/api/films/2/',
  },
  {
    id: '3',
    title: 'Star Wars: Episode I - The Phantom Menace',
    director: 'George Lucas',
    episode_id: 0,
    release_date: '',
    producer: '',
    opening_crawl: '',
    characters: [],
    url: 'https://swapi.dev/api/films/3/',
  }
]