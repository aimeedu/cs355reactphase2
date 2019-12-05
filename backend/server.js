const request = require('request');
const axios = require('axios'); //HTTPS client. Similar to request

const fs = require('fs'); //used for writing into the text file might not need

const db = require('./queries');
const express = require("express"); //Library used for connection to the database
const app = express();


const cheerio = require('cheerio'); //Used for webscraping
const {Pool} = require("pg");
const bodyParser = require('body-parser');
// const router = require("express").Router;
// process is a global object.
/*Use either port 5000 or one specified in .env file */
const port = process.env.PORT || 5000;
//cors: cross origin resource sharing, allowed ajax request access resource from remote host.
const cors = require('cors');

//dotenv: load environment variables form a .env file
require('dotenv').config();

// middleware
app.use(cors());
//allow us to parse json, this should work but not.
app.use(express.json());


/*this is working. OLD WAY */
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


// todo: move to queries.js later --------------------------------------------------------
const pool = new Pool(config);

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
        /* If the description is unavailable set the description to the title */
        if (description == null)
            description = title;
        /*If the lastModified is unavailable set the lastModified to the current time stamp */
        if (lastModified == null)
            lastModified = Date.now();
        pool.query('INSERT INTO page (url, title, description, lastModified) VALUES ($1, $2, $3, $4)', [getURL, title, description, lastModified], (error) => {
        if (error) {
            throw error
        }
    })
    })
});

//todo: get search results.
app.get('/custom', (req, res) => {

})

// the crawler gets all the plain text from the body of a web page --------------------------------------------------------
const URL = 'https://www.atptour.com/';
// write to a txt file. Pizon's code can parse text file, but need to clean up the file first.
// the txt file is going to output under the backend folder.
request(URL, function (err, res, body) {
    if(err) {
        console.log(err, "error occured while hitting URL");
    }
    else {
        // let arr =[];
        let $ = cheerio.load(body);
        let txt = $('body').text();
        let t2 =["hello my name is aimee, hello my name is aimee"]
        // arr.push(txt);
        setup(txt);
        console.log(counts);

        fs.writeFile('data.txt', txt, function (err) {
            if(err) {
                console.log(err);
            }
            else{
                console.log("success");
            }
        });
    }
});

let counts = {};
let keys = [];
function setup (txt){
    let allwords = txt.join("\n")
    let tokens  = allwords.split(/\W+/);
    for (let i = 0; i< tokens.length; i++){
        let word = tokens[i]//.toLowerCase();
        if (!/\d+/.test(word)) {

            if (counts[word] === undefined) {
                counts[word] = 1;
                keys.push(word);
            } else {
                counts[word] = counts[word] + 1;
            }
        }
    }

    // function compare(a,b){
    //     var countA = counts[a];
    //     var countB = counts[b];
    //     return countB - countA;
    // }
    // keys.sort(compare);

}

