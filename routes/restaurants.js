const express = require("express");
const Restaurant = require("../models/restaurant")
const router = express.Router();

router.use(express.json());

// get all restaurant from database
router.get('/', async (req, res) => {
    try{
        let restaurant = await Restaurant.find();
        res.send(restaurant);
    }
    catch(ex) {
        res.status(500).send("Error" + ex.message);
    }   
})

// get single restaurant detail by id
router.get('/:restaurantId', async (req, res) => {
    try {
        let restaurant = await Restaurant.findById(req.params.restaurantId);
        if(!restaurant) {
            return res.status(404).send("Given ID is not exist")
        }
        res.status(200).send(restaurant);
    }
    catch(ex) {
        res.status(500).send("Error" + ex.message);
    }
})

// add restaurants to database
router.post('/', async (req, res) => {
    try{
        if(!req.body.restaurantName || !req.body.restaurantAddress || !req.body.contact || !req.body.locationUrl || !req.body.businessType || !req.body.imgUrl || !req.body.contact) {
            return res.status(404).send("Please fill required fields");
        } 
    
        let restaurant = new Restaurant({
            restaurantName: req.body.restaurantName,
            restaurantAddress: req.body.restaurantAddress,
            floor: req.body.floor,
            ownerName: req.body.ownerName,
            businessType: req.body.businessType,
            imgUrl: req.body.imgUrl,
            locationUrl: req.body.locationUrl,
            contact: req.body.contact,
            ratings : req.body.ratings,
        });
        restaurant = await restaurant.save();
        res.send(restaurant);
    }
    catch(ex) {
        res.status(500).send("Error" + ex.message);
    }
    
});

//update a paticular restaurant details
router.put('/:restaurantId', async (req, res) => {
    try{
        let restaurant = await Restaurant.findById(req.params.restaurantId);
        if(!restaurant) {
            return res.status(404).send("id is not exist");
        }

        if(!req.body.restaurantName) {
            return res.status(400).send("Mendatory fields are required");
        }

        restaurant.set({name:req.body.restaurantName});
        restaurant.set({name:req.body.restaurantAddress});
        restaurant.set({name:req.body.floor});
        restaurant.set({name:req.body.ownerName});
        restaurant.set({name:req.body.businessType});
        restaurant.set({name:req.body.imgUrl});
        restaurant.set({name:req.body.locationUrl});
        restaurant.set({name:req.body.contact});
        restaurant = await restaurant.save();
        res.send(restaurant);
    }catch(ex) {
        res.status(500).send("Error" + ex.message);
    }
})

//delete a restaurant from database
router.delete('/:restaurantsId', async (req, res) => {
    try{
        let restaurant = await Restaurant.findByIdAndDelete({ _id: req.params.restaurantsId});
        if(!restaurant) {
            return res.status(404).send("Not exist in the system");
        }
        res.send(restaurant);
    }
    catch(ex) {
        res.status(500).send("Error" + ex.message);
    }
})

module.exports = router;

