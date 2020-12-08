const http = require('http');

const weatherStackUrl = `http://api.weatherstack.com/current?access_key=e165668332036f7625c94c1303145af6&query=40,-75&units=f`;

const request = http.request(weatherStackUrl, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data += chunk.toString();
    });

    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    });
});

request.on('error', (error) => {
    console.log('An error', error);
});

request.end();