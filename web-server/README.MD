Web-server application is a complete full-stack application with a front end and a back end. The front end presents a form to the user to enter a location.
Once the user submits the form, the app will trigger a backend API to fetch the geo location of the entered location and it's current weather. On successful, response, the necessary information will be displayed to the user.

Necessary validation are in place.

The command to start the application from the root directory of the project is:
nodemon src/app.js or 
node src/app.js

Url of the landing page of the application is: http://localhost:3000/


The nodemon dependency has been added under the "devDependencies". This way, you can also run the application in the local environment using the following command:
npm run dev

https://rishi-weather-app.herokuapp.com
https://git.heroku.com/rishi-weather-app.git

Rishi Bhalla