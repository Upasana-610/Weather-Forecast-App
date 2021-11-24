const path = require("path");
const express = require("express");
const geocode = require("./utils/geocode");

const forecast = require("./utils/forecast");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;
//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// set up handle bars engine and location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Upasana Pan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About App",
    name: "Upasana Pan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help App",
    name: "Upasana Pan",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Provide Address",
    });
  }
  geocode(
    req.query.address,
    (error, { location, latitude, longitude } = {}) => {
      if (error) {
        return res.send({ error: error });
      }

      forecast({ latitude, longitude }, (error, forecastdata) => {
        if (error) return res.send({ error: error });
        res.send({
          location: location,
          Data: forecastdata,
          Address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 help",
    name: "Upasana Pan",
    errorMessage: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Upasana Pan",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
