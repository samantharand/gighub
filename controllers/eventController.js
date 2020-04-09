const express = require('express')
const router = express.Router()
const Event = require('../models/event')
const User = require('../models/user')
const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/user')
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname) // new Date().toISOString() + 
  }
})

const upload = multer({
  storage: storage
  // dest: 'uploads/'
})

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

//create
router.get('/new', async (req, res) => {
  if (req.session.userId){
    const todaysDate = moment(Date.now()).utc().format("YYYY-MM-DD")
    // const newDate = moment(foundEvent.date).utc().format("YYYY-MM-DD")
  	res.render('events/new.ejs', {
      todaysDate: todaysDate
    })
  }else{
  	res.redirect('/auth/login')
  }
		
})

router.post('/', upload.single('eventPhoto'), async (req, res, next) => {
 	try {
  		
	  		const eventToCreate = {
	  			name: req.body.name,
	  			user: req.session.userId,
	  			date: req.body.date,
	  			location: req.body.location,
	  			eventPhoto: req.file.path,
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

//show
router.get('/:id', async (req, res, next) => {
  try {
  		const foundEvent = await Event.findById(req.params.id).populate('user').populate('comments.user')
      
  		res.render('events/show.ejs', {event: foundEvent})
  	}catch(error){
  		next(error)
  	}
})

//update
router.get("/:id/edit",async (req, res, next) => {
  try {
      const foundEvent = await Event.findById(req.params.id).populate('user')
  		
  		const newDate = moment(foundEvent.date).utc().format("YYYY-MM-DD")

      if(req.session.userId == foundEvent.user._id){
  			res.render('events/edit.ejs', {
          event: foundEvent, 
          newDate: newDate
        })
  		}else{
  			req.session.message= "you must be the host to edit"
  			res.redirect('/auth/login')
  		}
  	}catch(error){
  		next(error)
  	}
  })

router.put('/:id', upload.single('eventPhoto'), async (req, res, next) => {
  try {
      if(req.file){
        req.body.eventPhoto = req.file.path
      }
  		const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body,{new:true})

  		res.redirect(`/events/${updatedEvent._id}`)
  	}catch(error){
  		next(error)
  	}
  })

router.delete("/:id", async (req, res, next) => {
  try {
  		const foundEvent = await Event.findById(req.params.id)
  		if(req.session.userId == foundEvent.user._id){
  			const deletedEvent = await Event.findByIdAndRemove(req.params.id)
  			res.redirect('/events')
  		}else{
  			res.redirect('/auth/login')
  		}
  	}catch(error){
  		next(error)
  	}
  })


module.exports = router