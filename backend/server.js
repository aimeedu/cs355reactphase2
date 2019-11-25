const {Pool, Client} = require("pg");
const express = require("express");
const app = express();

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
    post: 5432,
    database: "d8qp223qobrp87",
    ssl: true
}
const pool = new Pool(config);

app.listen(port, () => console.log(`Server is running on port ${port}`));

// GET method route
// respond with sth when a GET request is made to the homepage
// actual end point is http://localhost:5000/admin
app.get('/admin', function (req, res) {
    // res.send('hello world');

    pool.connect(err => {
        if (err) throw err;
        else {
            queryDatabase();
        }
    });

    function queryDatabase() {
        const insert = `
        INSERT INTO word (wordname) VALUES ('Hello');
        INSERT INTO word (wordname) VALUES ('World');
        INSERT INTO page (url, title) VALUES ('test1.com', 'title');
    `;
        const select = `SELECT * FROM search;`;

        pool
            .query(select, (err, table) => {
                // print the result form the selected table.
                console.log(table);
                res.send(table.rows);
                // pool.end();
            })
    }

})

