const express = require('express')
const AuthRouter = express.Router()
const User = require('../models/user.js')

// Get All
AuthRouter.get('/', (req, res, next) => {
  AuthRouter.find((err, AuthRouter) => {
    console.log(AuthRouter)
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(AuthRouter)
  })
})


//Like comment
AuthRouter.put('/like/:AuthRouterID', (req, res, next) => {
  AuthRouter.findOneAndUpdate(
    { _id: req.params.AuthRouterID },
    { $inc: { likes: 1 }},
    { new: true },
    (err, updatedAuthRouter) => {
      if(err) {
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedAuthRouter)
    }
  )
})

//Comments by like Range
AuthRouter.get('/search/bylikes/:btm/:top', (req, res, next) => {
  AuthRouter.where('likes').gte(req.params.btm).lte(req.params.top).exec((err, AuthRouter)=> {
    if(err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(AuthRouter)
  })
})

  //Update One
AuthRouter.put("/:authRouterId", (req, res, next) => {
  AuthRouter.findOneAndUpdate(
    { _id: req.params.AuthRouterId},
    req.body,
    {new: true},
    (err, updatedAuthRouter) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedAuthRouter)
    }
  )  
})

//Delete One
AuthRouter.delete("/:authRouterId", (req, res, next) => {
  Inventory.findOneAndDelete(
    {_id: req.params.AuthRouterId}, 
    (err, deletedItem) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted item ${deletedItem.title} from the database`)
    }
  )
})

  module.exports = AuthRouter