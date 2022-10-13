const { Double } = require('bson');
const { Module } = require('module');
const mongoose = require('mongoose');
const internal = require('stream');

const restaurantsSchema = new mongoose.Schema({
    restaurantname: String,
    restaurantaddress: String,
    floor: String,
    ownername: String,
    businesstype: String,
    imgUrl: String,
    locationUrl: String,
    contact: Number,
    ratings : String,
})

const Restaurant = mongoose.model("restaurant", restaurantsSchema);

module.exports = Restaurant;