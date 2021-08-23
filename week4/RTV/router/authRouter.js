const express = require('express')
const AuthRouter = express.Router()
const user = require('../models/user')

// Get All
AuthRouter.get('/', (req, res, next) => {
  user.find((err, AuthRouter) => {
    console.log(AuthRouter)
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(AuthRouter)
  })
})

// Post
AuthRouter.post('/', (req, res, next) => {
  const newUser =   new user(req.body)
  newUser.save((err, savedUser) => {
      if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedUser)
  })
})


//Like comment
AuthRouter.put('/like/:AuthRouterID', (req, res, next) => {
  user.findOneAndUpdate(
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
  user.where('likes').gte(req.params.btm).lte(req.params.top).exec((err, AuthRouter)=> {
    if(err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(AuthRouter)
  })
})

  //Update One
AuthRouter.put("/:authRouterId", (req, res, next) => {
  user.findOneAndUpdate(
    { _id: req.params.authRouterId},
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
  user.findOneAndDelete(
    {_id: req.params.authRouterId}, 
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