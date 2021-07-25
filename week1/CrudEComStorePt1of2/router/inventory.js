const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory');

router.get ('/', (req, res, next) => {
    Inventory.find((err, items) =>{
        if (err) {
            res.status(500);
            return next(err);
        } else {
            return res.status(200).send(items);
        }
    })
});

module.exports = router;