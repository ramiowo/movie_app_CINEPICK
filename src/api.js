const fetch = require("node-fetch");

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTM2MTFmYzE2M2NmZWFjMjdlZjExODA0YmMzMGM4YyIsIm5iZiI6MTczMDI3MDU2My44MjQwODQzLCJzdWIiOiI2NzIxYjQ3YmZlMmE4YTAxMWVkNzEwODciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.n3PlAC41wjWl565TMMrNS9ZEOG0aYV94eGre8gPjd0U";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: API_KEY,
  },
};

const fetchData = (urlName) => {
  return fetch(`${BASE_URL}${urlName}language=ko-kr`, options).then((res) =>
    res.json()
  );
};

export const nowPlaying = () => fetchData("movie/now_playing?");
export const popular = () => fetchData("movie/popular?");
export const topRated = () => fetchData("movie/top_rated?");
export const upComming = () => fetchData("movie/upcoming?");
export const movieDetail = (id) => fetchData(`movie/${id}?`);
export const movieTrailer = (id) => fetchData(`movie/${id}/videos?`);
export const genresMovie = () => fetchData("genre/movie/list?");
export const searchMovie = (keyword) =>
  fetchData(`search/movie?query=${keyword}&include_adult=true&`);
