const express = require('express')
const inventoryRouter = express.Router()
const Inventory = require('../models/inventory.js')

// Get All
InventoryRouter.get('/', (req, res, next) => {
  Inventory.find((err, Inventory) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(inventory)
  })
})

// Add new inventory
inventoryRouter.post('/', (req, res, next) => {
  const newInventory = new Inventory(req.body)
  newInventory.save((err, savedInventory) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedInventory)
  })
})

module.exports = inventoryRouter