const db = require('./queries')
const express = require("express");
const app = express();

const URL_TO_CRAWL = 'https://apple.com';
const cheerio = require('cheerio');
const axios = require('axios');
const {Pool} = require("pg");

// const router = require("express").Router;
const port = process.env.PORT || 5000;
//cors: cross origin resource sharing, allowed ajax request access resource from remote host.
const cors = require('cors');
//dotenv: load environment variables form a .env file
require('dotenv').config();
// middleware
app.use(cors());
//allow us to parse json
app.use(express.json());

app.listen(port, () => console.log(`Server is running on port ${port}`));

// GET method route
// actual end point is http://localhost:5000/admin
app.get('/admin', db.getSearchTable);
app.post('/admin', db.insertData);

app.get('/test', (req, res) => {
    res.send('test!!!!');
});


// const insertData = (url) => axios.get(url).then((response) => {
//     let urlvar, title, description, lastModified;
//     if(response.status === 200) {
//         const html = response.data;
//         const $ = cheerio.load(html);
//         urlvar = url;
//         title = $('title').text();
//         description = $('meta').filter((i, elem) => elem.attribs.name === 'description')[0].attribs.content;
//         lastModified = response.headers['last-modified'];
//     }
//     pool.query('INSERT INTO page (url, title, description, lastModified) VALUES ($1, $2, $3, $4)', [urlvar, title, description, lastModified], (error, results) => {
//         if (error) {
//             throw error
//         }
//     })
// });
//
// getData(URL_TO_CRAWL);
