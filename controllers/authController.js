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
		const desiredPassword = req.body.username
		// check if they belong to an existing user
		const userWithSameUsername = await User.find({ username: req.body.username})
		// if they do,
		if(userWithSameUsername) {
			res.redirect('/auth/register')
		} 
			// reload register page and display message 
		// else they dont
			// store the username and password and id loggedIn
		// redirect to home page with message welcoming them
	} catch (error) {
		next(error)
	}
})









module.exports = router