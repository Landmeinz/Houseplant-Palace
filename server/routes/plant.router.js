
const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


// GET all of the plants associated to the logged-in user along with the current date and next_water date //
router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    console.log('--- in router.GET /api/plant');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('router.GET /api/plants req.user', req.user);

    let queryText = `
      SELECT    *, CURRENT_DATE, "date_watered" + INTERVAL '1 day' * "water_freq" AS "next_water"
      FROM      "plant"
      WHERE     "user_id" = $1 
      ORDER BY  "next_water" ASC ; ` ;

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


// GET all of the data on the SPECIFIC plant //
router.get('/:id', rejectUnauthenticated, (req, res) => {
    // GET route code here
    console.log('--- in router.GET /api/plant/:id');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('router.GET /api/plants/:id req.user', req.user);
    console.log('req.params.id'), req.params.id;

    let queryText = `
        SELECT 	*, "date_watered" + INTERVAL '1 day' * "water_freq" AS "next_water"
        FROM   	"plant"
        WHERE  	"plant"."user_id" = $1 
        AND    	"plant"."id" = $2;` ;

    const values = [req.user.id, req.params.id]

    pool.query(queryText, values)
        .then(result => {
            console.log('--- router.get --- plant/:id --- result.rows', result.rows);
            res.send(result.rows);
        }).catch(error => {
            console.log('ERROR router.GET /api/plant', error);
            res.sendStatus(500);
        });
});



// POST a new plant to the plant database AND upload the avatar_url to the photos db as well // 
router.post('/', rejectUnauthenticated, (req, res) => {
    // POST route code here
    console.log('--- in router.POST /api/plant');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('router.POST /api/plants req.user', req.user);
    console.log('--- in router.POST req.body', req.body);

    // first send all of the plant info to the plant DB
    let queryTextPlant = `
    INSERT INTO "plant"
	    ("user_id", "nickname", "avatar_url", "date_added", "plant_type", "light_level", "water_freq", "date_watered", "date_potted", "date_fertilized", "notes") 
    VALUES 
	    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING
        "id";` ;

    const valuesPlant = [
        req.user.id,
        req.body.nickname,
        req.body.avatar_url,
        req.body.date_added,
        req.body.plant_type,
        req.body.light_level,
        req.body.water_freq,
        req.body.date_watered,
        req.body.date_potted,
        req.body.date_fertilized,
        req.body.notes
    ]

    pool.query(queryTextPlant, valuesPlant)
        // when we get the result back then post the avatar_url to the photos db with the newly created plant id
        .then(result => {
            console.log('--- this is the result.rows[0] of the first plant .post', result.rows[0].id);
            
            // NEW PLANT ID IS HERE!
            console.log('New Plant Id:', result.rows[0].id);
            const newPlantId = result.rows[0].id

            // Now handle the genre reference
            let queryTextPhoto = `
            INSERT INTO "photo"
                ("user_id", "plant_id", "photo_url", "date_uploaded")
            VALUES 
                ($1, $2, $3, $4);` ;

            const valuesPhoto = [req.user.id, newPlantId, req.body.avatar_url, 'today'];

            pool.query(queryTextPhoto, valuesPhoto)
                .then(result => {
                    console.log('--- this is the result from the db POST, result');
                    
                    res.sendStatus(201);
                // catch for the second photo query
                }).catch(error => {
                    console.log('ERROR in the photo db on the double post', error);
                    res.sendStatus(500);
                });

        // catch for the first plant query
        }).catch(error => {
            console.log('ERROR in the plant db on the double post', error);
            res.sendStatus(500);
        });
});


// DELETE plant // 
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    // DELETE route code here
    console.log('----- in router.DELETE /api/plant/:id');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('router.DELETE /api/plants/:id req.user', req.user);
    console.log('req.params'), req.params.id;


    let queryText = `
        DELETE 	FROM "plant"
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


// UPDATE plant // 
router.put('/:id', rejectUnauthenticated, (req, res) => {
    // PUT route code here
    console.log('---------- in router.PUT /api/plant/:id');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('router.PUT /api/plants/:id req.user', req.user);
    console.log('req.params'), req.params.id;
    console.log('req.body', req.body);

    let queryText = `
        UPDATE 	"plant"
        SET 	"nickname" = $1,
                "avatar_url" = $2,
                "date_added" = $3,
                "plant_type" = $4,
                "light_level" = $5,
                "water_freq" = $6,
                "date_watered" = $7,
                "date_potted" = $8,
                "date_fertilized" = $9,
                "notes" = $10
        WHERE 	"id" = $11;` ;

    const values = [
        req.body.nickname,
        req.body.avatar_url,
        req.body.date_added,
        req.body.plant_type,
        req.body.light_level,
        req.body.water_freq,
        req.body.date_watered,
        req.body.date_potted,
        req.body.date_fertilized,
        req.body.notes,
        req.params.id
    ];

    pool.query(queryText, values)
        .then(result => {
            console.log('--- router.PUT --- plant/:id --- result.rows', result.rows);
            res.send(result.rows);
        }).catch(error => {
            console.log('ERROR router.PUT /api/plant/:ID', error);
            res.sendStatus(500);
        });
});


// UPDATE WATER DATE FORM DASHBOARD // 
router.put('/water/:id', rejectUnauthenticated, (req, res) => {
    // PUT route code here
    console.log('---------- in router.PUT /api/plant/:id');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('router.PUT /api/plants/:id req.user', req.user);
    console.log('req.params'), req.params.id;
    console.log('req.body', req.body);

    let queryText = `
        UPDATE 	"plant"
        SET 	"date_watered" = $1
        WHERE 	"id" = $2; ` ;

    const values = ['today', req.params.id];

    pool.query(queryText, values)
        .then(result => {
            console.log('--- router.PUT --- plant/:id water update --- result.rows', result.rows);
            res.send(result.rows);
        }).catch(error => {
            console.log('ERROR router.PUT water update /api/plant/:ID', error);
            res.sendStatus(500);
        });
});


module.exports = router;