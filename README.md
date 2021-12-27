# Houseplant Palace
- Duration: Solo Project Challenge 2.5 Weeks

## Description
### An app where a plant lover can track their plant's growth progress with photos stored in a single place.

## Project Screenshots
![HP All Pages](https://user-images.githubusercontent.com/85810386/147121509-92853b4a-8e62-41d6-9b8c-9ed5ca42f602.jpg)

## A Live Preview of Houseplant Palace Hosted on Heroku:
### 1: Click on the link below and allow 20-30 seconds for app to wake up
- https://polar-temple-90290.herokuapp.com/#/dashboard

### 2: Sign in as guest_user
- username: guest_user
- password: guest_user

### 3: Poke Around App
- go ahead an take a look around, make some edits, or add a new plant.
- if you like the app go ahead and register as a new user and get started today!

## Built With

- HTML
- JS
- REACT
- REDUX
- SAGA
- NODE
- EXPRESS
- AXIOS
- SQL

## Acknowledgement

#### Thanks to Prime Digital Academy who equipped and helped me to make this application a reality.
#### Special shout out to my instructors Dane Smith and Liz Kerber

## Installation for Local Machines

### Prerequisites
Before you get started, make sure you have the following software installed on your computer:
- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

### Create database and table
1. Create a database named `houseplant_palace`

2. Run the queries from `database.sql` on the `houseplant_palace` database

3. The queries in the tables.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on Postgres, so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries,

4. Open up your editor of choice and run an npm install

5. Run npm run server in your terminal
   
6. Run npm run client in your terminal

7. The npm run client command will open up a new browser tab for you!

If you would like to name your database something else, you will need to change `houseplant_palace` to the name of your database name in `server/modules/pool.js`

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)

## Lay of the Land

There are a few videos linked below that show a walkthrough the client and sever setup to help acclimatize to the boilerplate. Please take some time to watch the videos in order to get a better understanding of what the boilerplate is like.

- [Initial Set](https://vimeo.com/453297271)
- [Server Walkthrough](https://vimeo.com/453297212)
- [Client Walkthrough](https://vimeo.com/453297124)

Directory Structure:

- `src/` contains the React application
- `public/` contains static assets for the client-side like plant images
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App

