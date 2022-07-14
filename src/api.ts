const LANGUAGE = "ko-KR";
const API_KEY = "92d2be67030e2606ed1abba7da76fb7a";

const BASE_PATH = "https://api.themoviedb.org/3";

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}`).then((response) =>
    response.json()
  );
}
