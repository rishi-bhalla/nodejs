const path = require('path');
const express = require('express');
const hbs = require('hbs');
const foreCast = require('./utils/foreCast');
const geoCode = require('./utils/geoCode');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath); 

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rishi'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rishi'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rishi',
        helpText: 'This is some helpful text.'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        res.send({
            error: 'You must provide the address.'
        });
        return;
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            res.send({ error });
            return;
        }
    
        foreCast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                res.send({ error });
                return;
            }

            res.send({
                address: req.query.address,
                location,
                foreCast: foreCastData
            });
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        res.send({
            error: 'You must provide a search term.'
        });
        return;
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rishi',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rishi',
        errorMessage: 'Page not found'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});