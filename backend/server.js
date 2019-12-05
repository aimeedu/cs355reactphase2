const request = require('request');
const fs = require('fs');

const db = require('./queries')
const express = require("express");
const app = express();


const cheerio = require('cheerio');
const axios = require('axios');
const {Pool} = require("pg");
const bodyParser = require('body-parser')
// const router = require("express").Router;
// process is a global object.
const port = process.env.PORT || 5000;
//cors: cross origin resource sharing, allowed ajax request access resource from remote host.
const cors = require('cors');
//dotenv: load environment variables form a .env file
require('dotenv').config();

// middleware
app.use(cors());
//allow us to parse json, this should work but not.
app.use(express.json());
//this is working.
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }));


// move to queries.js later -------------------------------------------------------
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// password stored as environment variable.
const PS = process.env.PS;
const config = {
    user: "pkgnjnqybwtacz",
    password: PS,
    host: "ec2-107-22-228-141.compute-1.amazonaws.com",
    port: 5432,
    database: "d8qp223qobrp87",
    ssl: true
}
const pool = new Pool(config);
// move to queries.js later --------------------------------------------------------

app.listen(port, () => console.log(`Server is running on port ${port}`));

// GET method route
// actual end point is http://localhost:5000/admin
app.get('/admin', db.getSearchTable);

app.post('/admin', (req,res)=>{
    const getURL = req.body.inputURL;
    //print the url in the terminal
    let title, description, lastModified;
    // need to fix the web crawler. for some website, it can't extracting data from certain field. try apple.com
    axios.get(getURL).then((res) => {
        if(res.status === 200) {
            const html = res.data;
            const $ = cheerio.load(html);
            title = $('title').text();
            console.log(title);
            description = $('meta').filter((i, elem) => elem.attribs.name === 'description')[0].attribs.content;
            console.log(description);
            lastModified = res.headers['last-modified'];
            console.log(lastModified);
        }
        pool.query('INSERT INTO page (url, title, description, lastModified) VALUES ($1, $2, $3, $4)', [getURL, title, description, lastModified], (error) => {
        if (error) {
            throw error
        }
    })
    })
});

// get search result.
app.get('/custom', (req, res) => {

})

// the crawler gets all the plain text from the body of a web page --------------------------------------------------------
const URL = 'https://en.wikipedia.org/wiki/London';
// write to a txt file. Pizon's code can parse text file, but need to clean up the file first.
// the txt file is going to output under the backend folder.
request(URL, function (err, res, body) {
    if(err) {
        console.log(err, "error occured while hitting URL");
    }
    else {
        let arr =[];
        let $ = cheerio.load(body);
        let txt = $('body').text(); //Get all text from body tags of html

        arr.push(txt); //todo: Do we need this?

        fs.writeFile('data.txt', arr, function (err) {
            if(err) {
                console.log(err);
            }
            else{
                console.log("success");
            }
        });
    }
});

