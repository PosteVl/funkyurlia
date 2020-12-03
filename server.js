require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const validUrl = require("valid-url");
const Funkurl = require("./models/url");
const { find } = require("./models/url");

// Basic Configuration
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(express.json());

app.use("/public", express.static(`${process.cwd()}/public`));

// app.get("/", function (req, res) {
//   res.sendFile(process.cwd() + "/views/index.html");
// });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  console.log(req.body);
  res.json({ greeting: "hello API" });
});

const generateRandomId = () => {
  return Math.floor(Math.random() * Math.floor(5 * 100));
};

app.post("/api/shorturl/new", async (req, res) => {
  const url = req.body.url;
  const urlShort = generateRandomId();

  // check url valid
  if (!validUrl.isWebUri(url)) {
    res.status(401).json({ error: "invalid URL" });
  } else {
    try {
      let findOne = await Funkurl.findOne({
        original_url: url,
      });
      if (findOne) {
        res.json({
          original_url: findOne.original_url,
          short_url: findOne.short_url,
        });
      } else {
        // if url doesnt exist, create one and push to db
        findOne = new Funkurl({
          original_url: url,
          short_url: urlShort,
        });
        await findOne.save();
        res.json({
          original_url: findOne.original_url,
          short_url: findOne.short_url,
        });
      }
    } catch (err) {
      res.status(500).json({ error: "error on server" });
    }
  }
});

app.get("/api/shorturl/:short_url?", async (req, res) => {
  try {
    const url = await Funkurl.findOne({
      short_url: req.params.short_url,
    });
    if (url) {
      return res.status(200).send(url.original_url);
    } else {
      return res.status(404).json("invalid destination");
    }
  } catch (err) {
    res.status(500).json("error on server");
  }
});


app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
