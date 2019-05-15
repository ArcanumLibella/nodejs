    
/*
Configurer le module de route
*/
const express = require('express');
const router = express.Router();
//

/* 
Configurer MYSQL
*/
const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    port: 8889,
    database : 'nodejs'
});
//

/*
Définition du CRUD
*/
// CRUD: Create
router.post('/article', (req, res) => {

    /* 
    Vérifier la présence du title et du content dans la requête client
    */
   if( req.body && req.body.title.length > 0 && req.body.content.length > 0 ){
       
        // Connexion de la BDD
        connection.connect();

        // Définition de l'item
        const item  = { title: req.body.title, content: req.body.content };
    
        // Inscrire des données SQL
        connection.query('INSERT INTO post SET ?', item, (error, results, fields) => {
            if (error) {
                res.json({ msg: 'Error create', err: error })
            }
            else{
                res.json({ msg: 'Create', data: results })
            }
        });

        // Fermer la connexion
        connection.end();
   }

   else{
        res.json({ msg: 'Create', error: 'No data' })
   }
});

// CRUD: Read
router.get('/article', (req, res) => {

    // Connexion de la BDD
    connection.connect();

    // Récupérer des données SQL
    connection.query('SELECT * FROM post', (error, results, fields) => {
        if (error) {
            res.json({ msg: 'Error get all', err: error })
        }
        else{
            res.json({ msg: 'Get ALL', data: results })
        }
    });

    // Fermer la connexion
    connection.end();
});

// CRUD: Read
router.get('/article/:id', (req, res) => {
    // Connexion de la BDD
    connection.connect();

    // Récupérer des données SQL
    connection.query(`SELECT * FROM post WHERE _id = ${req.params.id}`, (error, results, fields) => {
        if (error) {
            res.json({ msg: 'Error get one', err: error })
        }
        else{
            res.json({ msg: 'Get One', data: results })
        }
    });

    // Fermer la connexion
    connection.end();
});

// CRUD: Update
router.put('/article/:id', (req, res) => {
    res.json({ msg: 'Update one by ID', error: null })
});

// CRUD: Delete
router.delete('/article/:id', (req, res) => {
    res.json({ msg: 'Delete one by ID', error: null })
});
//


/*
Exporter le module de route
*/
module.exports = router;
//