const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5a2648f173b8eda85fc0783bd341b525&query='+long+','+lat+'&units=f';
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('No Internet', undefined);
        } else if (response.body.error) {
            callback(response.body.error.info, undefined);
        } else {
            const data = response.body.current;
            callback(undefined, `${data.weather_descriptions}. It is currently ${data.temperature} degress out. It feels like ${data.feelslike} degress out. The humidity is ${data.humidity}%`);
        }
    });
};

module.exports = {
    forecast: forecast
};