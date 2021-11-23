const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();



// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});



// // get's the whole list of users? 
// router.get('/list', (req, res) => {

//   let queryText = `
//     SELECT 	  *
//     FROM 	    "user"
//     ORDER BY  "access_level" DESC, 
//               "username" ASC ; ` ;

//   pool.query(queryText)
//     .then(result => {
//       console.log('--- result.rows', result.rows);
//       res.send(result.rows);
//     }).catch(error => {
//       console.log('ERROR router.GET /api/user/list', error);
//       res.sendStatus(500);
//     });
//   res.send(req.user);
// });




// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted

router.post('/register', (req, res, next) => {

  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  console.log('--- in router.post username, password', username, password);

  const queryText = `
    INSERT INTO "user" 
      ("username", "password")
    VALUES 
      ($1, $2) RETURNING id` ;

  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});



// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});



// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
