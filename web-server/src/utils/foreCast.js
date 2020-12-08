const request = require('request');

const foreCast = (latitude, longitude, callback) => {
    const weatherStackUrl = `http://api.weatherstack.com/current?access_key=e165668332036f7625c94c1303145af6&query=${longitude},${latitude}&units=f`;

    request({url: weatherStackUrl, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the Weather Stack!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. The current temperature is ${body.current.temperature} but feels like ${body.current.feelslike}.`);
        }
    });
};

module.exports = foreCast;