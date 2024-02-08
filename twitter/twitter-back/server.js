// Importation des modules
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Configuration de la base de données
const db = mysql.createPool({
    host: process.env.DB_HOST, // 'mysql-chabertamaury.alwaysdata.net'
    user: process.env.DB_USER, // '248271'
    password: process.env.DB_PASSWORD, // 'SECRET'
    database: process.env.DB_NAME // 'chabertamaury_tweet'
});

// Initialisation de l'application Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // pour parser les requêtes JSON

// Route de test pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
    res.send('Le serveur est en marche !');
});

// Route pour publier un tweet
app.post('/publish', (req, res) => {
    const { title, content, date } = req.body;
    console.log(req.body);
    const query = "INSERT INTO tweet (title, content, date) VALUES (?, ?, ?)";
    db.query(query, [title, content, date], (error, results) => {
        if (error) {
            console.error(error);
            // En cas d'erreur, renvoyer l'erreur au client
            return res.status(500).send('Erreur lors de la publication du tweet', error);
        }
        res.status(200).send({ id: results.insertId, title, content, date });
    });
});

// Route pour récupérer tous les tweets
app.get('/tweets', (req, res) => {
    const query = "SELECT * FROM tweet ORDER BY date DESC";
    db.query(query, (error, results) => {
        if (error) return res.status(500).send('Erreur lors de la récupération des tweets');
        res.status(200).send(results);
    });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
