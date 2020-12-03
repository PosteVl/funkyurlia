import axios from "axios";

const baseShortenUrl = "api/shorturl/new";

const createShortenedUrl = (urlToShorten) => {
  const request = axios.post(baseShortenUrl, urlToShorten);

  return request.then((response) => response.data);
};

const getShortenedUrl = (urlToGet) => {
  const request = axios.get(`api/shorturl/${urlToGet}`);
  console.log("gets hereee with request: " + `api/shorturl/${urlToGet}`);
  return request.then((response) => response.data);
};

export default { createShortenedUrl, getShortenedUrl };
