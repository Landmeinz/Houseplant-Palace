const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();


// get's the whole list of users? 
router.get('/', (req, res) => {

    console.log('--- in router.GET userList');    
    
    let queryText = `
    SELECT 	    *
    FROM 	    "user"
    ORDER BY    "access_level" DESC, 
                "username" ASC ; ` ;

    pool.query(queryText)
        .then(result => {
            console.log('--- result.rows', result.rows);
            res.send(result.rows);
            console.log('--- log after res.send status router.get userList');
            
        }).catch(error => {
            console.log('ERROR router.GET /api/userList', error);
            res.sendStatus(500);
        });
});


module.exports = router;
