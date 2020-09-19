const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// setup handle bars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vasanth'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Vasanth'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Vasanth',
        msg: 'Please follow steps'
    });
});

/* app.get('', (req, res) => {
    res.send('<h1>Hello Express!</h1>');
}); */

/* app.get('/help', (req, res) => {
    res.send([
        {
            name: 'vas'
        },
        {
            name: 'das'
        }
    ]);
});

app.get('/about', (req, res) => {
    res.send('<p>About</p>');
}); */

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You Must Provide Address!'
        });
    }
    geocode.geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
           return res.send({ error });
        }
        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You Must Provide Search Term!'
        });
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vasanth',
        errorMessage: 'Help Article Not Found!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vasanth',
        errorMessage: 'Page Not Found!'
    });
});

app.listen(port, () => {
    console.log('Listening to ' + port);
});
