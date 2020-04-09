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
  			user: req.session.userId
  		}

  		event.comments.push(commentToCreate)
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
      res.redirect(`/events/${req.params.eventId}`)
    }catch(error){
      next(error)
    }
  })
router.get('/:eventId/:commentId/edit', async (req, res, next) => {
  try {
      const foundEvent = await Event.findById(req.params.eventId)
     

      const foundComment = foundEvent.comments.id(req.params.commentId) 
    
      res.render("comments/edit.ejs", {event: foundEvent, comment: foundComment})
    }catch(error){
      next(error)
    }
})
// router.put('/:eventId/:commentId', async (req, res, next) => {
//   try {
//         const foundEvent = await Event.findById(req.params.eventId)
     

//       const foundComment = foundEvent.comments.id(req.params.commentId) 
//       console.log(`this is found comment ${foundComment}`)
//       console.log(foundComment._id)
//       console.log("this is req.body")
//       console.log(req.body)
      
//       await Comment.findOneAndReplace({id: foundComment._id}, {text: req.body.text})
       
      
//       res.redirect(`/events/${req.params.eventId}`)

//     }catch(error){
//       next(error)
//     }
//   })
module.exports= router