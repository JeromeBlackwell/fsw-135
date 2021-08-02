const express = require('express')
const partsRouter = express.Router()
const Parts = require('../models/parts.js')

// Get All
partsRouter.get('/', (req, res, next) => {
  Parts.find((err, parts) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(parts)
  })
})

//Post One
partsRouter.post("/", (req, res, next) => {
  const newParts = new Parts(req.body)
  Parts.save((err, savedParts) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedParts)
  })
})

//Delete One
partsRouter.delete("/:partsId", (req, res, next) => {
  Parts.findOneAndDelete(
    {_id: req.params.partsId}, 
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
partsRouter.put("/:partsId", (req, res, next) => {
  Parts.findOneAndUpdate(
    { _id: req.params.partsID},
    req.body,
    {new: true},
    (err, updatedParts) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedParts)
    }
  )  
})

// Add new parts
partsRouter.post('/', (req, res, next) => {
  const newParts = new Parts(req.body)
  newParts.save((err, savedParts) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedParts)
  })
})

// Add many parts
partsRouter.post('/manyparts', (req, res, next) => {
  const Parts = req.body
  const newParts = new Parts(Parts)
  Parts.insertMany(Parts, (err, savedParts) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedParts)
  })
})



module.exports = partsRouter