const request = require('request');

const geocode = (address, callback) => {
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidmFzYW50aGt1bWFyMTIxIiwiYSI6ImNrZjd2cTMzNzA2YW8ycnFzanI0M3J6aW4ifQ.a1z7m1dmFWexSPgbEuyugg&limit=1';

    request({ url: geoCodeUrl, json: true }, (error, response) => {
        if (error) {
            callback('No Internet', undefined);
        } else if (response.body.features.length === 0) {
            callback('You have messed up!', undefined);
        } else {
            const data = response.body.features[0];
            callback(undefined, {
                latitude: data.center[1], 
                longitude: data.center[0],
                location: data.place_name
            });
        }
    });

};

module.exports = {
    geocode: geocode
};