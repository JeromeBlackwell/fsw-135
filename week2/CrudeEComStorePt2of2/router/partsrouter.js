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