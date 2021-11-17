
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
      SELECT    *, CURRENT_DATE, "date_watered" + INTERVAL '1 day' * "water_freq" AS "next_water"
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

router.post('/', rejectUnauthenticated, (req, res) => {
    // POST route code here
    console.log('--- in router.POST /api/plant');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('router.POST /api/plants req.user', req.user);
    console.log('--- in router.POST req.body', req.body);
    

    let queryText = `
    INSERT INTO "plant"
	    ("user_id", "nickname", "avatar_url", "date_added", "plant_type", "light_level", "water_freq", "date_watered", "date_potted", "date_fertilized", "notes") 
    VALUES 
	    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);` ;

    const values = [req.user.id, req.body.nickname, req.body.date_added, req.body.plant_type, req.body.light_level, req.body.water_freq, req.body.date_watered, req.body.date_potted, req.body.date_fertilized, req.body.notes]

    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            res.sendStatus(500);
        });
});

module.exports = router;