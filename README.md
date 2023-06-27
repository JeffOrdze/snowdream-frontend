# snowDream
snowDream is a web application that provides curated avalanche conditions and weather data for backcountry skiing. It utilizes the Avalanche Canada API for avalanche conditions and the OpenWeather API for weather data. The project aims to help users make informed decisions about their backcountry skiing adventures by providing up-to-date information about various backcountry areas.

## Features
- Avalanche Conditions: Retrieves avalanche conditions from the Avalanche Canada API, allowing users to access the latest data on avalanche risks and safety.
- Weather Data: Integrates with the OpenWeather API to display real-time weather information for different backcountry locations.
- Google Login: Implements Google Login functionality to provide users with a personalized experience and access to additional features.
- Login with email: A login flow to sign up with your email address, name and given password 
- bcrypt: All passwords are hashed with bcrypt to ensure privacy

## Tech Stack
- Frontend: React
- Backend: Node.js, Express
- Database: MySQL (using Knex.js for query building)
- Additional Libraries: 
1. tanStack useQuery for data fetching and server state management
2. mantine UI for the carousel and slides
3. react router dom for routing
4. unix-timestamp for accurately parsing time stamps pulled from OpenWeather
5. axios to supplement the tanStack queries
6. sass for nested css
7. html react parser to parse HTML elements coming from Avalanche Canada

## Installation
1. Clone the repository:
```javascript

git clone <repository-url>;

```

2. Navigate to the project directory:
```javascript

cd snowDream

```
3. Install the dependencies for the frontend and backend:
```javascript
 //Install frontend dependencies
 
cd client
npm install

// Install backend dependencies
cd ../server
npm install

```
4. Configure the environment variables:

- Backend: Rename the example.env file in the server directory to .env and update the values based on your environment. Make sure to set the required environmental variables for the Google Login and database connection details.

5. Set up the database:

- Create a MySQL database for snowDREAM.

- Run the migrations and seed data using Knex.js:

```javascript

 //Apply migrations
npx knex migrate:latest

 //Seed the database with sample data
npx knex seed:run

```

6. Start the development server:
```javascript

 //Start the backend server
cd server
npm start

// Start the frontend development server in a separate terminal
cd client
npm start

```
7. Access the application in your browser at http://localhost:3000.

## Usage

1. Upon launching the application, you will be presented with the home page and a carousel of all backcountry areas currently that are currently available in the database.
2. Select an area of interest to view detailed avalanche conditions and current weather data by clicking on the "show me the forecast" button. A modal will appear with relevant information for the selected area
3. Optionally, log in with your Google account or create an account to access additional features and personalize your experience. Once logged in you can populate your favourited areas by visiting the "locations" page and clicking the "add to my favourites" button.
4. The search bar on the locations page will filter the available areas based on the text input into the search bar to narrow down your results
