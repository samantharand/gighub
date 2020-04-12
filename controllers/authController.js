const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const multer = require('multer')

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

// registration page
router.get('/register', (req, res) => {
	res.render('auth/register.ejs')
})

// complete registration
router.post('/register', upload.single('profilePhoto'), async (req, res, next) => {
	try {
		// desired username and password
		const desiredUsername = req.body.username
		const desiredPassword = req.body.password
		// check if they belong to an existing user
		const userWithSameUsername = await User.findOne({ username: desiredUsername})
		// if they do,
		if(userWithSameUsername) {
			// reload register page and display message 
			req.session.message = "Sorry, that username already exists :( "
			console.log("username exists");
			res.redirect('/auth/register')
		// else they dont
		} else {
			console.log("req file vv");
			console.log(req.file);
			console.log("req file ^^");

			const salt = bcrypt.genSaltSync(10)
			const hashedPassword = bcrypt.hashSync(desiredPassword, salt)
			// store the username and password and id loggedIn
			const createdUser = await User.create({
				username: desiredUsername,
				password: hashedPassword,
				age: req.body.age,
				location: req.body.location,

				// profilePhoto: req.file.path,
			})

			req.session.loggedIn = true
			req.session.userId = createdUser._id
			req.session.username = createdUser.username

			req.session.message = "account created :)"
			console.log(createdUser);
			res.redirect('/')
		}
		// redirect to home page with message welcoming them
	} catch (error) {
		next(error)
	}
})

// login page
router.get('/login', (req, res) => {
	// message = req.session.message
	// req.session.message = undefined
	res.render('auth/login.ejs')
})

// login - check requirements 
router.post('/login', async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username })

		if(!user) {
			console.log("bad username");
			req.session.message = "Invalid Username or Password"
			res.redirect('/auth/login')
		} else {
    		const loginInfoIsValid = bcrypt.compareSync(req.body.password, user.password)
    		if(loginInfoIsValid) {
    			req.session.loggedIn = true
    			req.session.userId = user._id
    			req.session.username = user.username

    			req.session.message = `Welcome back, ${user.username}`
    			res.redirect('/')
    		} else {
    			console.log("bad password");
    			req.session.message = "Invalid Username or Password"
    			res.redirect('/auth/login')
    		}
		}
			console.log(req.session)

	} catch (error) {
		next(error)
	}
})

// destroy
router.get('/logout', async (req, res) => {
	await req.session.destroy()
	res.redirect('/auth/login')
})

module.exports = router