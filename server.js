'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// const xml = require('./xml/Viygotskiyi_viy_L._Psihologiya_Iskusstva');

const app = express();

let nextId = 5;

app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, '')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
app.get('/xml/', (req, res) => {

    res.send(req);
    //res.send(req.query);
});

app.get('*', (req, res) => {
    fs.readFile(`${__dirname}/index.html`, (error, html) => {
        if (error) throw error;

        res.setHeader('Content-Type', 'text/html');
        res.end(html);
    });
});

app.listen(app.get('port'), () => console.log(`Server is listening: http://localhost:${app.get('port')}`));
