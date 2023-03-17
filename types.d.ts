import { requests } from "./requests";

export interface IMovie {
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  genres?: IMovieGenres[];
  runtime: number;
  seasons?: ITVShowSeason[];
  number_of_episodes?: number;
}

export enum IGenresUrl {
  action = requests.fetchActionMovies,
  comedy = requests.fetchComedyMovies,
  documentary = requests.fetchDocumentaries,
  history = 36,
  horror = requests.fetchHorrorMovies,
  romance = requests.fetchRomanceMovies,
}

export type Genre =
  | "action"
  | "animation"
  | "adventure"
  | "comedy"
  | "crime"
  | "documentary"
  | "drama"
  | "family"
  | "fantasy"
  | "history"
  | "horror"
  | "music"
  | "mystery"
  | "romance"
  | "science fiction"
  | "tv movie"
  | "thriller"
  | "war"
  | "western"
  | "top rated"
  | "trending"
  | "";

interface IMovieGenres {
  id: number;
  name: string;
}

interface ITVShowSeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface ICreditCast {
  adult: boolean;
  cast_id: number;
  character: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  popularity: string;
  profile_path: string;
}

export interface IPerson {
  biography: string;
  birthday: string;
  deathday: string | null;
  imdb_id: string;
  name: string;
  place_of_birth: string;
  profile_path: string;
}

export interface Element {
  type:
    | 'Bloopers'
    | 'Featurette'
    | 'Behind the Scenes'
    | 'Clip'
    | 'Trailer'
    | 'Teaser'
}
