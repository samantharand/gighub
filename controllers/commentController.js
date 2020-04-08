const express = require('express')
const router = express.Router()
const Event = require("../models/event")
const User = require('../models/user')

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


module.exports= router