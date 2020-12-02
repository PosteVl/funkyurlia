import axios from "axios";

const baseShortenUrl = "api/shorturl/new";

const createShortenedUrl = (urlToShorten) => {
  const request = axios.post(baseShortenUrl, urlToShorten);

  return request.then((response) => response.data);
};

export default { createShortenedUrl };
