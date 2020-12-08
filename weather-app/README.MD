Weather-App is an application that fetches the geo coding information of a location or place from https://www.mapbox.com/. The data from the geo coding API i.e latitude, longitude and location is fed as an input to the weather forcast API frpm https://weatherstack.com/.

Below are the two APIs used in this application:

1. GeoCoding API Url: https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicmlzaGktYmhhbGxhIiwiYSI6ImNraGpwaXhqNzA4OGIycm5veTlocWM0bmIifQ.LIyHU7apWjjumxsY1lxKqA&limit=1

2. Weather Stack API Url: http://api.weatherstack.com/current?access_key=e165668332036f7625c94c1303145af6&query=37.8267,-122.4233&units=f

The above APIs make use of an access token that you can get by registering to the above two websites (https://www.mapbox.com/ and https://weatherstack.com/). The ones used above have been registered under the free tier.

To run this application, run the following command through command line:

node app.js <<name of a place>>

Examples: 
node app.js Boston
node app.js India


Rishi Bhalla