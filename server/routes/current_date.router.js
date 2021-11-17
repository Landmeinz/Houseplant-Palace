const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GO GET THE CURRENT DATE FROM THE SERVER // 

router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    console.log('--- in router.GET /api/current_date');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('router.GET /api/current_date req.user', req.user);

    let queryText = `
        SELECT CURRENT_DATE, 
            DATE_PART('year', NOW()) AS "YEAR",
            DATE_PART('month', NOW()) AS "MONTH",
            DATE_PART('day', NOW()) AS "DAY" ; ` ;

    pool.query(queryText)
        .then(result => {
            console.log('--- result.rows', result.rows);
            res.send(result.rows);
        }).catch(error => {
            console.log('ERROR router.GET /api/plant', error);
            res.sendStatus(500);
        });
});

module.exports = router;