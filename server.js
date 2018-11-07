const request = require("request");
const User = require('./models/user');
const Entry = require('./models/entry');
const bodyParser = require('body-parser');
const https = require('https');
const http = require('http');
const unirest = require('unirest');
const events = require('events');
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));


mongoose.Promise = global.Promise;

// ---------------- RUN/CLOSE SERVER -----------------------------------------------------
let server = undefined;

function runServer(urlToUse) {
    return new Promise((resolve, reject) => {
        mongoose.connect(urlToUse, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(config.PORT, () => {
                console.log(`Listening on localhost:${config.PORT}`);
                resolve();
            }).on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

if (require.main === module) {
    runServer(config.DATABASE_URL).catch(err => console.error(err));
}

function closeServer() {
    return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    }));
}

// ---------------USER ENDPOINTS-------------------------------------
// POST -----------------------------------
// creating a new user
app.post('/users/create', (req, res) => {

    //take the name, username and the password from the ajax api call
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    //exclude extra spaces from the username and password
    username = username.trim();
    password = password.trim();

    //create an encryption key
    bcrypt.genSalt(10, (err, salt) => {

        //if creating the key returns an error...
        if (err) {

            //display it
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        //using the encryption key above generate an encrypted pasword
        bcrypt.hash(password, salt, (err, hash) => {

            //if creating the ncrypted pasword returns an error..
            if (err) {

                //display it
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            //using the mongoose DB schema, connect to the database and create the new user
            User.create({
                name,
                username,
                password: hash,
            }, (err, item) => {

                //if creating a new user in the DB returns an error..
                if (err) {
                    //display it
                    return res.status(500).json({
                        message: 'Internal Server Error'
                    });
                }
                //if creating a new user in the DB is succefull
                if (item) {

                    //display the new user
                    console.log(`User \`${username}\` created.`);
                    return res.json(item);
                }
            });
        });
    });
});

// signing in a user
app.post('/users/login', function (req, res) {

    //take the username and the password from the ajax api call
    const username = req.body.username;
    const password = req.body.password;

    //using the mongoose DB schema, connect to the database and the user with the same username as above
    User.findOne({
        username: username
    }, function (err, items) {

        //if the there is an error connecting to the DB
        if (err) {

            //display it
            return res.status(500).json({
                message: "Internal server error"
            });
        }
        // if there are no users with that username
        if (!items) {
            //display it
            return res.status(401).json({
                message: "Username is already taken"
            });
        }
        //if the username is found
        else {

            //try to validate the password
            items.validatePassword(password, function (err, isValid) {

                //if the connection to the DB to validate the password is not working
                if (err) {

                    //display error
                    console.log('Could not connect to the DB to validate the password.');
                }

                //if the password is not valid
                if (!isValid) {

                    //display error
                    return res.status(401).json({
                        message: "Password Invalid"
                    });
                }
                //if the password is valid
                else {
                    //return the logged in user
                    console.log(`User \`${username}\` logged in.`);
                    return res.json(items);
                }
            });
        };
    });
});
// external API call
//let getRecipesFromEdamam = function (ingredients) {
//    let emitter = new events.EventEmitter();
//    let options = {
//        host: 'api.edamam.com',
//        path: '/search?q=' + ingredients + '&app_id=6571a93b&app_key=fb779a44b1eb7dc5918482cf5f2f5c0f&from=0&to=3&calories=591-722&health=alcohol-free',
//        method: 'GET',
//        gzip: true,
//        headers: {
//            //            'Authorization': "fb779a44b1eb7dc5918482cf5f2f5c0f",
//            'Content-Type': "application/json",
//            'Port': 443,
//            'User-Agent': 'Paw/3.1.2 (Macintosh; OS X/10.12.5) GCDHTTPRequest'
//        }
//    };
//
//    https.get(options, function (res) {
//        //        console.log(res);
//        let body = '';
//        res.on('data', function (chunk) {
//            //                        body += chunk;
//            //                        let jsonFormattedResults = JSON.parse(body);
//            emitter.emit('end', chunk);
//        });
//
//    }).on('error', function (e) {
//
//        emitter.emit('error', e);
//    });
//    return emitter;
//};


// local API endpoints
//app.get('/edamam/:ingredient', function (req, res) {
//
//
//    //external api function call and response
//    let searchReq = getRecipesFromEdamam(req.params.ingredient);
//
//    //get the data from the first api call
//    searchReq.on('end', function (item) {
//        res.json(item);
//    });
//
//    //error handling
//    searchReq.on('error', function (code) {
//        res.sendStatus(code);
//    });
//
//});

app.get('/edamam/:ingredient', function (req, res) {
    var responseData;
    request({
        method: 'GET',
        uri: 'https://api.edamam.com/search?q=' + req.params.ingredients + '&app_id=6571a93b&app_key=fb779a44b1eb7dc5918482cf5f2f5c0f&from=0&to=3&calories=591-722&health=alcohol-free',
        gzip: true
    }, function (error, response, body) {
        // body is the decompressed response body
        console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
        console.log('the decoded data is: ' + body);
        res.json(body);
    });

});

// -------------entry ENDPOINTS------------------------------------------------
// POST -----------------------------------------
// creating a new Entry
app.post('/entry/create', (req, res) => {
    let entryType = req.body.entryType;
    let inputDate = req.body.inputDate;
    let inputPlay = req.body.inputPlay;
    let inputAuthor = req.body.inputAuthor;
    let inputRole = req.body.inputRole;
    let inputCo = req.body.inputCo;
    let inputLocation = req.body.inputLocation;
    let inputNotes = req.body.inputNotes;
    let loggedInUserName = req.body.loggedInUserName;

    Entry.create({
        entryType,
        inputDate,
        inputPlay,
        inputAuthor,
        inputRole,
        inputCo,
        inputLocation,
        inputNotes,
        loggedInUserName
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            return res.json(item);
        }
    });
});

// PUT --------------------------------------
app.put('/entry/:id', function (req, res) {
    let toUpdate = {};
    //    let updateableFields = ['achieveWhat', 'achieveHow', 'achieveWhen', 'achieveWhy']; //<--Marius? 'entryType
    let updateableFields = ['entryType', 'inputDate', 'inputPlay', 'inputAuthor', 'inputRole', 'inputCo', 'inputLocation', 'inputNotes', 'loggedInUserName'];
    updateableFields.forEach(function (field) {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    //    console.log(toUpdate);
    Entry
        .findByIdAndUpdate(req.params.id, {
            $set: toUpdate
        }).exec().then(function (achievement) {
            return res.status(204).end();
        }).catch(function (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// GET ------------------------------------
// accessing all of a user's entries
app.get('/entry-date/:user', function (req, res) {

    Entry
        .find()
        .sort('inputDate')
        .then(function (entries) {
            let entriesOutput = [];
            entries.map(function (entry) {
                if (entry.loggedInUserName == req.params.user) {
                    entriesOutput.push(entry);
                }
            });
            res.json({
                entriesOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});
app.get('/entry-read/:user', function (req, res) {

    Entry
        .find({
            "entryType": "read"
        })
        .sort('inputDate')
        .then(function (entries) {
            let entriesOutput = [];
            entries.map(function (entry) {
                if (entry.loggedInUserName == req.params.user) {
                    entriesOutput.push(entry);
                }
            });
            res.json({
                entriesOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});
app.get('/entry-seen/:user', function (req, res) {

    Entry
        .find({
            "entryType": "seen"
        })
        .sort('inputDate')
        .then(function (entries) {
            let entriesOutput = [];
            entries.map(function (entry) {
                if (entry.loggedInUserName == req.params.user) {
                    entriesOutput.push(entry);
                }
            });
            res.json({
                entriesOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});
app.get('/entry-performed/:user', function (req, res) {

    Entry
        .find({
            "entryType": "performed"
        })
        .sort('inputDate')
        .then(function (entries) {
            let entriesOutput = [];
            entries.map(function (entry) {
                if (entry.loggedInUserName == req.params.user) {
                    entriesOutput.push(entry);
                }
            });
            res.json({
                entriesOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

// accessing a single achievement by id
app.get('/entry/:id', function (req, res) {
    Entry
        .findById(req.params.id).exec().then(function (entry) {
            return res.json(entry);
        })
        .catch(function (entries) {
            console.error(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// DELETE ----------------------------------------
// deleting an achievement by id
app.delete('/entry/:id', function (req, res) {
    Entry.findByIdAndRemove(req.params.id).exec().then(function (entry) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

// MISC ------------------------------------------
// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;
