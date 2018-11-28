const {
    app,
    runServer,
    closeServer
} = require('../server');

var chai = require('chai');

var chaiHttp = require('chai-http');

var recipe = require('../models/recipe.js');

var should = chai.should();

chai.use(chaiHttp);

describe('recipe-search-node-capstone', function () {
    it('should add a recipe on POST', function () {
        chai.request(app)
            .post('/recipe/create')
            .send({
                //            entryType: "performed",
                //            inputDate: "2014-11-05T00:00:00.000Z",
                //            inputPlay: "King Lear",
                //            inputAuthor: "William Shakespeare",
                //            inputRole: "Goneril",
                //            inputCo: "Kingman Shakespeare Festival",
                //            inputLocation: "Santa Barbara, CA",
                //            inputNotes: "With A FORK!",
                loggedInUserName: "patrick@gmail.com"
            })
            .then(function (err, res) {
                //should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            })
            .catch(err => console.log({
                err
            }));
    });
    it('Should add recipe to favorites', function () {
        chai.request(app)
            .post('/favorite/create')
            .then(function (res) {
                res.should.have.status(201);
                done();
            })
            .catch(err => console.log({
                err
            }));
    });
    it('Should Delete a recipe', function () {

        chai.request(app)
            .delete('/recipe/:id')
            .then(function (res) {
                res.should.have.status(201);
                done();
            })
            .catch(err => console.log({
                err
            }));

    });
    it('Should Get All Users recipes', function () {

        chai.request(app)
            .get('/favorite/get/:loggedInUserName') //<-------????? Get request to '/entry-date/:user'
            .then(function (res) {
                res.should.have.status(201);
                done();
            })
            .catch(err => console.log({
                err
            }));
    });

});
