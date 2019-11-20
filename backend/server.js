const {Client} = require("pg");
const express = require("express");
const app = express();
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

// Do not hard code your username and password.
// Consider using Node environment variables.
//password stored as environment variable.
const PS = process.env.PS;

const config = {
    user: "pkgnjnqybwtacz",
    password: PS,
    host: "ec2-107-22-228-141.compute-1.amazonaws.com",
    post: 5432,
    database: "d8qp223qobrp87",
    ssl: true
}
const client = new Client(config);

app.listen(port, () => console.log(`Server is running on port ${port}`));

client.connect(err => {
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
    const select = 'SELECT * FROM page;';

    client
        .query(insert)
        .then(() => {
            console.log('Table created successfully!');
            client.end(console.log('Closed client connection'));
        })
        .catch(err => console.log(err))
        .then(() => {
            console.log('Finished execution, exiting now');
            process.exit();
        });
}