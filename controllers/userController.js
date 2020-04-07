const express = require('express')
const router = express.Router()
const User = require('../models/user')

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
router.get('/:id', async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.params.id)

		res.render('users/show.ejs', {
			user: foundUser
		})
	} catch (error) {
		next(error)
	}
})

// edit
router.get('/:id/edit', async (req, res, next) => {
	try {
		console.log(req.session);
		if (req.session.userId === req.params.id) {
			const foundUser = await User.findById(req.params.id)
			console.log("found user", foundUser);
			console.log("body", req.body);
			console.log("session", req.session);
			res.render('users/edit.ejs', {
				user: foundUser
			})
		} else {
			res.redirect('/auth/login')
		}


	} catch (error) {
		next(error)
	}
})

// update
router.put('/:id', async (req, res, next) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
		console.log("updateduser", updatedUser);
		res.redirect(`/users/${updatedUser._id}`)
	} catch (error) {
		next(error)
	}
})
























// destroy

module.exports = router