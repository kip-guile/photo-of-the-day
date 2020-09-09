### NASA photo of the day

A single page application which consumes ​[NASA's Astronomy Picture of the Day (APOD) API​](https://api.nasa.gov/) to display the pictures of different days, By default, today’s picture of the day should is displayed, but the user can select any other day. Users can also select a specific image and mark it as favorite, these selections persist between browser sessions.

#### Features

- Display the picture of the day, its title and description based on the date selected from a date picker.
- Save pictures of the day data into local storage.
- Ability to see and select any of the pictures of the day data saved as favourite.
- Ability to delete a single or all the favorited pictures of the day data from local storage.
- Ability to move the selected date for the picture of the day using previous and next day buttons besides using the date picker.
- Persisting favorited data on a NoSQL Database (Firebase, Mongo, etc.).
- photo previews of previous and next pictures of the day and include them in your
  application.

### Environment variables

create a .env file that includes

- REACT_APP_NASA_API - Your API key from the NASA website

##### npm scripts

To get the server running locally:

- clone this repo
- npm install to install required dependencies
- npm run start to start the local server
