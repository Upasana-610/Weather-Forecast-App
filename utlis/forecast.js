const request = require("request");
const forecast = ({ latitude, longitude }, callback) => {
  const url =
    `http://api.weatherstack.com/current?access_key=08219c4c601b842567276ff9a33c430f&query=` +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    `&units=s`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather forecast");
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out.It feels like ${body.current.feelslike} degrees out`
      );
    }
  });
};

module.exports = forecast;
