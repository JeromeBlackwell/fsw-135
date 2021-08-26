const express = require('express')
const IssueRouter = express.Router()
const Issue = require('../models/issue')

// Get All
IssueRouter.get('/', (req, res, next) => {
  Issue.find((err, IssueRouter) => {
    console.log(IssueRouter)
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(IssueRouter)
  })
})

// Post
IssueRouter.post('/', (req, res, next) => {
  const newIssue =   new Issue(req.body)
  newIssue.save((err, savedIssue) => {
      if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedIssue)
  })
})


//Like comment
IssueRouter.put('/like/:IssueRouterID', (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.IssueRouterID },
    { $inc: { likes: 1 }},
    { new: true },
    (err, updatedIssueRouter) => {
      if(err) {
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedIssueRouter)
    }
  )
})

//Comments by like Range
IssueRouter.get('/search/bylikes/:btm/:top', (req, res, next) => {
  Issue.where('likes').gte(req.params.btm).lte(req.params.top).exec((err, IssueRouter)=> {
    if(err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(IssueRouter)
  })
})

  //Update One
IssueRouter.put("/:IssueRouterId", (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.IssueRouterId},
    req.body,
    {new: true},
    (err, updatedIssueRouter) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedIssueRouter)
    }
  )  
})

// Add new Issue
IssueRouter.post("/", (req, res, next) => {
  req.body.user = req.user._id
  const newIssue = new Issue(req.body)
  newIssue.save((err, savedIssue) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedIssue)
  })
})

//Delete One
IssueRouter.delete("/:IssueRouterId", (req, res, next) => {
  Issue.findOneAndDelete(
    {_id: req.params.IssueRouterId}, 
    (err, deletedItem) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted item ${deletedItem.title} from the database`)
    }
  )
})

  module.exports = IssueRouter