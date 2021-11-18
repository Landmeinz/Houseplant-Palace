const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


// GET all photos //

router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  console.log('--- in router.GET /api/photo');

  console.log('router.get photo req.user', req.user);

  let queryText = `
    SELECT 	*
    FROM 	"photo"
    WHERE 	"user_id" = $1;` ;

  let userId = [req.user.id];

  pool.query(queryText, userId)
    .then(result => {
      console.log('--- router.GET /api/photo result.rows', result.rows);
      res.send(result.rows);
    }).catch(error => {
      console.log('ERROR router.GET /api/photo', error);
      res.sendStatus(500);
    });
});



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
    AND    	"plant_id" = $2;` ;

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






/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
