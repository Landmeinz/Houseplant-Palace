const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


// GET all of the plants associated to the logged-in user //

router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    console.log('--- in router.GET /api/plant');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('router.GET /api/plants req.user', req.user);

    let queryText = `
      SELECT    *
      FROM      "plant"
      WHERE     "user_id" = $1 ; ` ;

    const values = [req.user.id]

    pool.query(queryText, values)
        .then(result => {
            console.log('--- result.rows', result.rows);
            res.send(result.rows);
        }).catch(error => {
            console.log('ERROR router.GET /api/plant', error);
            res.sendStatus(500);
        });
});




// POST a new plant to the plant database // 

router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;
