const express = require('express')
const router = express.Router()
const Event = require("../models/event")
const User = require('../models/user')

router.get('/', async (req, res, next) => {
  try {
  	const foundEvents = await Event.find()
  		res.render("events/index.ejs", {
  			events: foundEvents
  		})
  	}catch(error){
  		next(error)
  	}
})
router.get('/new', async (req, res) => {
  if (req.session.userId){
  	res.render('events/new.ejs')
  }else{
  	res.redirect('/auth/login')
  }
		
})


router.post('/', async (req, res, next) => {
 	try {
  		
	  		const eventToCreate = {
	  			name: req.body.name,
	  			user: req.session.userId,
	  			date: req.body.date,
	  			location: req.body.location,
	  			eventPhoto: req.body.eventPhoto,
	  			details: req.body.details,
	  			capacity: req.body.capacity

	  		}
	  		// console.log(eventToCreate)
	  		const createdEvent = await Event.create(eventToCreate)
	  		console.log(createdEvent)
	  		req.session.message = `${createdEvent.name} added!`
	  		res.redirect('/')
  		
	
  	}catch(error){
  		next(error)
  	}

})

module.exports = router