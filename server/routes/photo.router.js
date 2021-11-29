const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


// GET all photos //

// router.get('/', rejectUnauthenticated, (req, res) => {
//   // GET route code here
//   console.log('--- in router.GET /api/photo');

//   console.log('router.get photo req.user', req.user);

//   let queryText = `
//     SELECT 	*
//     FROM 	"photo"
//     WHERE 	"user_id" = $1;` ;

//   let userId = [req.user.id];

//   pool.query(queryText, userId)
//     .then(result => {
//       console.log('--- router.GET /api/photo result.rows', result.rows);
//       res.send(result.rows);
//     }).catch(error => {
//       console.log('ERROR router.GET /api/photo', error);
//       res.sendStatus(500);
//     });
// });



// GET all selected photos //

router.get('/:id', rejectUnauthenticated, (req, res) => {
  // GET route code here
  console.log('--- in router.GET /api/photo');

  console.log('router.get photo req.user', req.user);
  console.log('req.params.id'), req.params.id;

  let queryText = `
    SELECT 	*
    FROM 	  "photo"
    WHERE 	"user_id" = $1
    AND    	"plant_id" = $2
    ORDER BY 	"photo".date_uploaded DESC ; ` ;

  let userId = [req.user.id, req.params.id];

  pool.query(queryText, userId)
    .then(result => {
      console.log('--- router.GET /api/photo result.rows', result.rows);
      res.send(result.rows);
    }).catch(error => {
      console.log('ERROR router.GET /api/photo', error);
      res.sendStatus(500);
    });
});



// POST new photo to photo db // 

router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log('--- in router.POST /api/plant');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('router.POST /api/plants req.user', req.user);
  console.log('--- in router.POST req.body', req.body);
  
  const plantID = req.body.plantId;
  const newPhotoUrl = req.body.newPhoto;

  let queryText = `
    INSERT INTO "photo"
	    ("user_id", "plant_id", "photo_url", "date_uploaded")
    VALUES 
	    ($1, $2, $3, $4);` ;

  const values = [req.user.id, plantID, newPhotoUrl, 'today']

  pool.query(queryText, values)
    .then(result => {
      res.sendStatus(201);
    }).catch(error => {
      res.sendStatus(500);
    });
});



// DELETE photo by id from the db // 

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // GET route code here
  console.log('----- in router.DELETE /api/photo/:id');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('router.DELETE /api/photo/:id req.user', req.user);
  console.log('req.params'), req.params.id;


  let queryText = `
      DELETE 	FROM "photo"
      WHERE 	"id" = $1;` ;

  const values = [req.params.id]

  pool.query(queryText, values)
      .then(result => {
          console.log('--- router.delete --- plant/:id --- result.rows', result.rows);
          res.send(result.rows);
      }).catch(error => {
          console.log('ERROR router.DELETE /api/plant/:ID', error);
          res.sendStatus(500);
      });
});



// DELETE photo by plant id from the db // 

router.delete('/plantPhoto/:id', rejectUnauthenticated, (req, res) => {
  // GET route code here
  console.log('----- in router.DELETE /api/photo/:plantId');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('router.DELETE /api/photo/:plantId req.user', req.user);
  console.log('req.params'), req.params.id;


  let queryText = `
    DELETE
    FROM  "photo"
    WHERE "plant_id" = $1 ;` ;

  const values = [req.params.id]

  pool.query(queryText, values)
      .then(result => {
          console.log('--- router.delete --- photo/:plantId --- result.rows', result.rows);
          res.send(result.rows);
      }).catch(error => {
          console.log('ERROR router.DELETE /api/photo/:plantId', error);
          res.sendStatus(500);
      });
});



module.exports = router;
