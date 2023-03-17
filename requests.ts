export const BASE_URL = "https://api.themoviedb.org/3";
export const BANNER_URL = "https://image.tmdb.org/t/p/w1280";
export const IMAGE_URL = "https://image.tmdb.org/t/p/w780";
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const requests = {
  fetchTrendingMovies: `${BASE_URL}/trending/all/day?api_key=${API_KEY}`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchAdventureMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=12`,
  fetchAnimationMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=16`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchCrimeMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=80`,
  fetchDocumentaryMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
  fetchDramaMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=18`,
  fetchFamilyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10751`,
  fetchFantasyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=14`,
  fetchHistoryMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=36`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchMusicMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10402`,
  fetchMysteryMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=9648`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchScienceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=878`,
  fetchTVMovieMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10770`,
  fetchThrillerMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=53`,
  fetchWarMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10752`,
  fetchWesternMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=37`,
  fetchTrendingTVShows: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
  fetchTopRatedTVShows: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
};
