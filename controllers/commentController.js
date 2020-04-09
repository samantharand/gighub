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
// router.delete("/:eventId/:commentId", async (req, res, next) => {
//   try {
//       await Comment.findByIdAndRemove(req.params.commentId)
//       res.redirect(`/events/${req.params.eventId}`)
//     }catch(error){
//       next(error)
//     }
//   })
router.get('/:eventId/:commentId/edit', async (req, res, next) => {
  try {
      const foundEvent = await Event.findById(req.params.eventId)
      console.log("\n found event")
      console.log(foundEvent)

      const foundComment = foundEvent.comments.id(req.params.commentId) 
      console.log("\n found comment")
      console.log(foundComment)
      res.render("comments/edit.ejs", {comment: foundComment})
    }catch(error){
      next(error)
    }
})
// router.put('/:commentId', async (req, res, next) => {
//   try {

//       const updatedComment = await Comment.findByIdAndUpdate(
//         req.params.commentId,
//         req.body,
//         {new:true}
//         )
//       res.send("updated comment")
//     }catch(error){
//       next(error)
//     }
//   })
module.exports= router