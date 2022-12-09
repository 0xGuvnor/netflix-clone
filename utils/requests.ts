const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";

const requests = {
  fetchTrending: `${baseUrl}/trending/all/week?api_key=${apiKey}&language=en-US`,
  fetchNetflixOriginals: `${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&page=2`,
  fetchTopRated: `${baseUrl}/movie/top_rated?api_key=${apiKey}&language=en-US`,
  fetchActionMovies: `${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=99`,
};

export default requests;
