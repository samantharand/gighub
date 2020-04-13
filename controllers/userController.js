const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Event = require('../models/event')
const Band = require('../models/band')
const Photo = require('../models/photo')
const Comment = require('../models/comment')
const multer = require('multer')
const requireAuth = require('../lib/requireAuth')
const userAuth = require('../lib/userAuth')
const bcrypt = require('bcrypt')

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
		// const commentsToDelete = await allEventsUserHasCommentedOn.comments.id(req.params.id).remove()
		// console.log(allUserComments)
		const allEvents = await Event.find()
		const foundAttending = await Event.find({'attendees._id': req.params.id})
	
		const userPhotos = await Photo.find({user: req.params.id})
		const foundUser = await User.findById(req.params.id)
		res.render('users/show.ejs', {
			user: foundUser,
			photos: userPhotos,
			events: foundAttending
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
		console.log('this is req.body of the orgin edit', req.body)
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
			const allEventsUserHasCommentedOn = await Event.find({'comments.user': req.params.id})
			console.log(allEventsUserHasCommentedOn)
			for(let i = 0; i < allEventsUserHasCommentedOn.length; i++){
				console.log("these are all the comments")
				console.log(allEventsUserHasCommentedOn[i].comments)
				const newComments = allEventsUserHasCommentedOn[i].comments.filter(comment => comment.user != req.params.id)
				console.log("these are the comments that are not by the current user\n")
				console.log(newComments)
				allEventsUserHasCommentedOn[i].comments = newComments
				allEventsUserHasCommentedOn[i].save()
				console.log("this is all the new all events comments")
				console.log(allEventsUserHasCommentedOn[i]) 
			}
  			// console.log(user)
			await Comment.deleteMany({'user': req.params.id})
			await Photo.remove({user: req.params.id})
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

router.get('/:id/newPassword', async (req, res, next) => {
  try {
  		const foundUser = await User.findById(req.params.id)
  		console.log('this is req.body in get', req.body)
  		console.log("this is the foundUser", foundUser)
  		res.render('users/newPassword.ejs', {user: foundUser})
  	}catch(error){
  		next(error)
  	}
  })
router.put('/:id/newPassword', async (req, res, next) => {
	try {
			const salt = bcrypt.genSaltSync(10)
			const hashedPassword = bcrypt.hashSync(req.body.password, salt)
			console.log(hashedPassword)

		console.log('this is req.body', req.body)

		const updatedUser = await User.findByIdAndUpdate(req.params.id, {password: hashedPassword}, {new: true})
		
		res.redirect(`/users/${req.params.id}`)
	} catch (error) {
		next(error)
	}
})





module.exports = router