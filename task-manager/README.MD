This is a full-fleged task-manager application having a lot of following features:

1. CRUD operations on User
2. CRUD operations on the tasks associated with each user
3. All above operations are protected under proper authentication mechanism using the jwt token
4. Create User and Login User, other than these two API's, all other API's of user and tasks are behind authentication. This means these API's call can only 
   be carried out if a user is logged into the application
5. The application uses bcyptjs for hashing the user passwords before saving them into the database
6. The response being sent to the client is sanitized to make sure the confidential information like passwords, etc are not exposed to the outside world
7. We have utilized the advanced features of postman to make sure we fix the authToken as an environment variable at the postman collection level so that we do not have to enter the same information again and again. We are achieving this by making use of the "Authorization: Inherit auth from parent" option under the Authorization tab of the postman.
8. Besides this, we are also using the postman's test tab to make sure we fetch the authToken from the create or login user API and populate it to the        "authToken" environment variable so that it is available for the other API's.


The API postman collection has also been attached for reference.

The application also contains few test cases using the "jest" and "supertest" frameworks. Package.json contains a script to run the tests.
In order to run the test cases use the following command:
npm test

The application makes use of few environment variables. Please make sure to add those environment variables for higher environments.
To run the application locally, use the following command:
npm run dev

Few websites that were using during the application development:
https://regex101.com/
https://jsbin.com/
https://app.sendgrid.com/
https://www.mongodb.com/cloud/atlas


Rishi Bhalla