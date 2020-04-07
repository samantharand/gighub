const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/login', (req, res) => {
	res.render('auth/login.ejs')
})

router.get('/register', (req, res) => {
	res.render('auth/register.ejs')
})

router.post('/register', async (req, res, next) => {
	try {
		// desired username and password
		const desiredUsername = req.body.username
		const desiredPassword = req.body.password
		// check if they belong to an existing user
		const userWithSameUsername = await User.findOne({ username: desiredUsername})
		// if they do,
		if(userWithSameUsername) {
			// reload register page and display message 
			req.session.message = "Sorry, that username already exists :("
			console.log("username exists");
			res.redirect('/auth/register')
		// else they dont
		} else {
			// store the username and password and id loggedIn
			const createdUser = {
				username: desiredUsername,
				password: desiredPassword,
				profilePhoto: req.body.profilePhoto,
				age: req.body.age,
				location: req.body.location
			}

			req.session.loggedIn = true
			req.session.userId = createdUser._id
			req.session.username = createdUser.username

			req.session.message = "account created"

			res.redirect('/')
		}
		// redirect to home page with message welcoming them
	} catch (error) {
		next(error)
	}
})









module.exports = router