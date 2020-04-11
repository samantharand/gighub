const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Event = require('../models/event')
const Band = require('../models/band')
const Photo = require('../models/photo')
const multer = require('multer')
const requireAuth = require('../lib/requireAuth')
const userAuth = require('../lib/userAuth')
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
		const foundUsers = await User.find()
		console.log(foundUsers);
		res.render('users/index.ejs', {
			users: foundUsers
		})
	} catch (error) {
		next(error)
	}
})

// show
router.get('/:id',requireAuth, async (req, res, next) => {
	try {
		const userPhotos = await Photo.find({user: req.params.id})
		const foundUser = await User.findById(req.params.id)
console.log('this is users photos - \n', userPhotos)
		res.render('users/show.ejs', {
			user: foundUser,
			photos: userPhotos
		})
	} catch (error) {
		next(error)
	}
})

// edit
router.get('/:id/edit', userAuth, async (req, res, next) => {
	try {
		console.log(req.session);
		
			const foundUser = await User.findById(req.params.id)
			console.log("found user", foundUser);
			console.log("body", req.body);
			console.log("session", req.session);
			res.render('users/edit.ejs', {
				user: foundUser
			})
		
		}


	 catch (error) {
		next(error)
	}
})

// update
router.put('/:id', upload.single('profilePhoto'), async (req, res, next) => {
	try {
		if(req.file) {
			req.body.profilePhoto = req.file.path
		}
		const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
		
		res.redirect(`/users/${updatedUser._id}`)
	} catch (error) {
		next(error)
	}
})

// destroy -- destroy all events and bands associated 
// right now it just delets the user it self - have to add delete the others later
router.delete('/:id', async (req, res, next) => {
  try {
  		if(req.session.userId == req.params.id){
  			// console.log(user)
  			await Band.remove({user: req.params.id})
  			await Event.remove({user:req.params.id})
  			await User.findByIdAndRemove(req.params.id)
  			console.log(req.session)
  			res.redirect('/auth/logout')
  		}else{
  			res.direct('/auth/login')
  		}
  	}catch(error){
  		next(error)
  	}
  })

// Attendees show up in event page 
router.post('/:eventId', async (req, res, next) => {
	try {
		const event = await Event.findById(req.params.eventId)
		const attendee = await User.findById(req.session.userId)
		
		event.attendees.push(attendee)
		await event.save()

		res.redirect('/events/' + event.id)
		console.log("new event.attendees[0].username", event.attendees[0].username);
	} catch (error) {
		next(error)
	}
})





module.exports = router