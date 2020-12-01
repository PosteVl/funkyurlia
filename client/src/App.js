import React, { useState } from "react";
import UrlForm from "./components/UrlForm";
import Footer from "./components/Footer";
import urlService from "./services/urlService";

const App = () => {
  const [newUrlName, setNewUrlName] = useState("");
  const [newShortUrlName, setNewShortUrlName] = useState("");
  const [urls, setUrls] = useState([]);
  const [creator, setCreator] = useState("phstX");

  const createNewUrl = () => {
    const urlVar = {
      url: newUrlName,
      shortUrl: newShortUrlName,
    };

    return urlVar;
  };

  const resetUrlForm = () => {
    console.log("in reset form");
    setNewUrlName("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const url = createNewUrl();
    urlService
      .createShortenedUrl(url)
      .then((returnedUrl) => {
        setUrls(urls.concat(returnedUrl));
        // queueAlert([
        //   {
        //     type: `success`,
        //     message: `Added "${returnedUrl.name}"`,
        //   },
        // ]);
      })
      .catch((error) => {
        //TODO implement error dealing mechanism
        console.log("in error");
        console.log(error);
      })
      .finally(() => resetUrlForm());
  };

  const handleChange = (event) => {
    setNewUrlName(event.target.value);
  };

  return (
    <div className="App">
      <h1>URL Shortener Microservice</h1>

      <UrlForm
        valueName={newUrlName}
        handleSubmit={(event) => handleSubmit(event)}
        handleChange={(event) => handleChange(event)}
      />

      <Footer footerValue={creator} />
    </div>
  );
};

export default App;
