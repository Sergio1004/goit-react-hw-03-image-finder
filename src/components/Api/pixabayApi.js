const API_KEY = "22545174-4038647272675c337d39bd153";
const BASE_URL = "https://pixabay.com/api";

function fetchImagesByQuery(quaery, page = 1) {
  return fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${quaery}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  ).then((res) => res.json());
}

export default fetchImagesByQuery;
