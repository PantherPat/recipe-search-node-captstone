"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const recipeSchema = new mongoose.Schema({
    searchInput: {
        type: String,
        required: false
    },
    //    inputDate: {
    //        type: Date,
    //        required: false
    //    },
    //    inputPlay: {
    //        type: String,
    //        required: false
    //    },
    //    inputAuthor: {
    //        type: String,
    //        required: false
    //    },
    //    inputRole: {
    //        type: String,
    //        required: false
    //    },
    //    inputCo: {
    //        type: String,
    //        required: false
    //    },
    //    inputLocation: {
    //        type: String,
    //        required: false
    //    },
    //    inputNotes: {
    //        type: String,
    //        required: false
    //    },
    loggedInUserName: {
        type: String,
        required: false
    }
});
//
//const Entry = mongoose.model('Entry', entrySchema);
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
