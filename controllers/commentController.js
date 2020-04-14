const express = require('express')
const router = express.Router()
const Event = require("../models/event")
const User = require('../models/user')
const Comment = require('../models/comment')
router.post('/:eventId', async (req, res, next) => {
  try {
  		const event = await Event.findById(req.params.eventId)
  		const user = await User.findById(req.session.userId)

  		const commentToCreate = {
  			text: req.body.text,
  			user: req.session.userId,
        event: req.params.eventId
  		}
      const newComment = await Comment.create(commentToCreate)
  		event.comments.push(newComment)
  		await event.save()
      
  		res.redirect('/events/' + event.id)
  	}catch(error){
  		next(error)
  	}
  })
router.delete("/:eventId/:commentId", async (req, res, next) => {
  try {
      const foundEvent = await Event.findById(req.params.eventId)
       const commentToRemove = await foundEvent.comments.id(req.params.commentId).remove() 
       console.log(commentToRemove)
      foundEvent.save()
      // req.session.message = "comment delted"
      res.redirect(`/events/${req.params.eventId}`)
    }catch(error){
      next(error)
    }
  })

router.get('/:eventId/:commentId/edit', async (req, res, next) => {
  try {
    const commentToEdit = await Comment.findById(req.params.commentId)
    console.log('this is the comment to edit')
    console.log(commentToEdit)
      const foundEvent = await Event.findById(req.params.eventId)
     
    
      res.render("comments/edit.ejs", {event: foundEvent, comment: commentToEdit})
    }catch(error){
      next(error)
    }
})

router.put('/:eventId/:commentId', async (req, res, next) => {
  try {
        const foundEvent = await Event.findOne({'comments._id': req.params.commentId})
        const foundComment = await Comment.findById(req.params.commentId) 
        console.log('this is the found event"')
      console.log(foundEvent)
      // foundEvent.update({ foundComment._id})
      // await Comment.findById(foundComment._id) {text: req.body.text})
      await foundComment.updateOne({text: req.body.text})
      await foundComment.save()
      const newFoundComment = await Comment.findById(req.params.commentId)
      console.log("this is found event nd foundevent.comment")
      console.log(foundEvent.comments)
      // console.log(foundEvent.comments[1])
      const indexToSplice = foundEvent.comments.findIndex(comment => comment._id == req.params.commentId)
      console.log('this is index to splice')
      console.log(indexToSplice)
      foundEvent.comments.splice(indexToSplice, 1, newFoundComment)
      await foundEvent.save()
      
      console.log(foundEvent.comments[indexToSplice])

      console.log("this is found comment after update")
      console.log(newFoundComment)
       
      
      res.redirect(`/events/${req.params.eventId}`)

    }catch(error){
      next(error)
    }
  })
module.exports= router