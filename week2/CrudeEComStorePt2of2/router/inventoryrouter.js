const express = require('express')
const InventoryRouter = express.Router()
const Inventory = require('../models/inventory.js')

// Get All
InventoryRouter.get('/', (req, res, next) => {
  Inventory.find((err, inventory) => {
    console.log(inventory)
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(inventory)
  })
})

//Post One
InventoryRouter.post("/", (req, res, next) => {
  const newInventory = new Inventory(req.body)
  newInventory.save((err, savedInventory) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedInventory)
  })
})

//Delete One
InventoryRouter.delete("/:inventoryId", (req, res, next) => {
  Inventory.findOneAndDelete(
    {_id: req.params.inventoryId}, 
    (err, deletedItem) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted item ${deletedItem.title} from the database`)
    }
  )
})

//Update One
InventoryRouter.put("/:inventoryId", (req, res, next) => {
  Inventory.findOneAndUpdate(
    { _id: req.params.inventoryId},
    req.body,
    {new: true},
    (err, updatedInventory) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedInventory)
    }
  )  
})

// Add new inventory
// InventoryRouter.post('/', (req, res, next) => {
//   const newInventory = new Inventory(req.body)
//   newInventory.save((err, savedInventory) => {
//     if(err){
//       res.status(500)
//       return next(err)
//     }
//     return res.status(201).send(savedInventory)
//   })
// })

module.exports = InventoryRouter