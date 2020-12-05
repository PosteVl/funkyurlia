import React, { useState, useEffect } from "react";
import UrlForm from "./components/UrlForm";
import Footer from "./components/Footer";
import urlService from "./services/urlService";
import Alert from "./components/Alert";
import EmptyField from "./components/EmptyField";
import ShortUrlField from "./components/ShortUrlField";
import uniqueRandom from "unique-random";
import "bootstrap/dist/css/bootstrap.min.css";

// play a bit with animations to get the gist
import Circle from "./components/Circle";

const random = uniqueRandom(1, 10000);

const App = () => {
  const [newUrlName, setNewUrlName] = useState("");
  const [newShortUrlName, setNewShortUrlName] = useState("");
  const [urls, setUrls] = useState([]);
  const [creator, setCreator] = useState("phstX");
  const [alerts, setAlerts] = useState([]);
  const [renderShortUrl, setRenderShortUrl] = useState(false);

  const createNewUrl = () => {
    const urlVar = {
      url: newUrlName,
      shortUrl: newShortUrlName,
    };

    return urlVar;
  };

  const resetUrlForm = () => {
    setNewUrlName("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const url = createNewUrl();
    urlService
      .createShortenedUrl(url)
      .then((returnedUrl) => {
        setUrls(urls.concat(returnedUrl));
        queueAlert([
          {
            type: `success`,
            message: `Added "${returnedUrl.original_url}" with value "${returnedUrl.short_url}"`,
          },
        ]);
        // if the shortened url version was created, set the boolean to render accordingly
        setRenderShortUrl(true);
      })
      .catch((error) => {
        handleCreateErrors(error);
      })
      .finally(() => resetUrlForm());
  };

  // handle errors associated with adding a new url
  const handleCreateErrors = (error) => {
    // const statusCode = error.response.status;
    console.log(error.message);
    const errorMessages = error.message;

    if (errorMessages.length > 0) {
      queueAlert([
        {
          type: "error",
          message: errorMessages,
        },
      ]);
    } else {
      throw error;
    }
  };

  const handleChange = (event) => {
    setNewUrlName(event.target.value);
  };

  /**
   * Map an array of alerts to a format usable by Alert Component
   *
   * @param {Object[]} newAlerts - An array of alerts to be transformed
   * @param {string} newAlerts[].type - "info" or "error" or "success"
   * @param {string} newAlerts[].message - The alert message
   */
  const queueAlert = (newAlerts) => {
    const timeoutFunc = (id) =>
      setAlerts((alerts) => alerts.filter((a) => a.id !== id));

    const alertsWithTimeout = newAlerts.map((a) => {
      return { ...a, id: `${a.type}-${random()}`, timeoutFunc: timeoutFunc };
    });

    setAlerts([...alerts, ...alertsWithTimeout]);
  };

  // display all queued alerts
  const alertList = alerts.map((alert) => {
    return (
      <Alert
        timeoutFunc={alert.timeoutFunc}
        key={alert.id}
        id={alert.id}
        type={alert.type}
        message={alert.message}
      ></Alert>
    );
  });

  // if I just redirect from the backend get endpoint, i will get CORS error
  // when react makes the calls, it gets the redirection as a response
  // the frontend then tries an ajax request to website, which doesn't have CORS headers
  // only my backend response has the CORS headers
  // For proper redirection, I will return status 200 and the url, and manually redirect it
  const handleClick = (event, urlToGet) => {
    console.log("handles click with url " + urlToGet);
    event.preventDefault();
    return urlService.getShortenedUrl(urlToGet).then((url) => {
      window.open(url);
    });
  };

  //display shortened url
  const shortUrlDisplay = renderShortUrl ? (
    <ShortUrlField
      originalUrlValue={urls.slice(-1)[0].original_url}
      shortUrlValue={urls.slice(-1)[0].short_url}
      clickHandler={handleClick}
    />
  ) : (
    <EmptyField />
  );

  return (
    <div className="App">
    
      <h1>URL Shortener Microservice</h1>
      
      {alertList}

      <UrlForm
        valueName={newUrlName}
        handleSubmit={(event) => handleSubmit(event)}
        handleChange={(event) => handleChange(event)}
      />

      {shortUrlDisplay}

      <Footer footerValue={creator} />
    </div>
  );
};

export default App;
