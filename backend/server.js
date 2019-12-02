const URL_TO_CRAWL = 'https://www.wikipedia.org/';

const {Pool} = require("pg");
const express = require("express");
const app = express();
const cheerio = require('cheerio');

const axios = require('axios');

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

// https://stackoverflow.com/questions/35633829/node-js-error-process-env-node-tls-reject-unauthorized-what-does-this-mean
// disable Node from rejecting self-signed certificates by allowing ANY unauthorised certificate.
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
};
const pool = new Pool(config);

app.listen(port, () => console.log(`Server is running on port ${port}`));

// GET method route
// respond with sth when a GET request is made to the homepage
// actual end point is http://localhost:5000/admin
app.get('/admin', (req, res) => {
    pool.connect(err => {
        if (err) throw err;
        else {
            queryDB();
        }
    });

    const queryDB = () => {
        const select = `SELECT * FROM search;`;
        pool
            .query(select, (err, table) => {
                // print the result form the selected table.
                // console.log(table);
                res.send(table.rows);
                // pool.end();
            })
    }
});

// web crawler data insert to DB using post or put method.
app.post('/someurl', (req, res) => {


    // data from the crawler ???



    pool.connect(err => {
        if (err) throw err;
        else {
            insertDB();
        }
    });
    const insertDB = () => {

        const resultData = getData(URL_TO_CRAWL);
        const insert = `
        
        INSERT INTO page (url, title, description, lastModified) VALUES (${resultData.url},${resultData.title},${resultData.description},${resultData.lastModified});
    `;
        pool
            .query(insert, (err, table) => {
                // print the result form the selected table.
                // console.log(table);
                res.send(table.rows);
                // pool.end();
            })
    }
});


const getData = (url) => axios.get(url).then((response) => {

    if(response.status === 200) {

        const html = response.data;

        const $ = cheerio.load(html);



        return {

            url: url,

            title: $('title').text(),

            description: $('meta').filter((i, elem) => elem.attribs.name === 'description')[0].attribs.content,

            lastModified: response.headers['last-modified']

        }

    }

});

