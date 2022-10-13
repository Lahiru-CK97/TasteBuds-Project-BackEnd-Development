const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    res.send("Successfully connected to API");
});

module.exports = router;